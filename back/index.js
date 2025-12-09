import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";
import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load prompt template from file
const promptTemplate = fs.readFileSync(path.join(__dirname, "prompt.txt"), "utf-8");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Initialize Groq SDK
const groq = new Groq({
  apiKey: process.env.AI_API_KEY,
});

// Health check
app.get("/", (req, res) => {
  res.json({ message: "WrapperDetector API is running" });
});

// Helper function to retry with different Groq models
// Try larger models first (they have higher token limits)
// Updated to use available models (some were decommissioned)
async function tryGenerateContent(prompt, modelsToTry = ["llama-3.3-70b-versatile", "llama-3.1-70b-versatile", "llama-3.1-8b-instant"]) {
  let lastError = null;
  
  for (const modelName of modelsToTry) {
    try {
      console.log(`🔄 Trying model: ${modelName}`);
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        model: modelName,
      });
      
      const text = completion.choices[0]?.message?.content || "";
      console.log(`✅ Success with ${modelName}`);
      return { text, model: modelName };
    } catch (err) {
      lastError = err;
      console.warn(`⚠️ ${modelName} failed:`, err.message);
      
      // If it's a token limit error (413), try next model (larger models have higher limits)
      if (err.message?.includes("413") || err.message?.includes("too large") || err.message?.includes("Request too large") || err.message?.includes("TPM")) {
        console.warn(`⚠️ ${modelName} token limit exceeded, trying next model...`);
        continue; // Try next model
      }
      
      // If it's a quota error (429), try next model
      if (err.message?.includes("429") || err.message?.includes("quota") || err.message?.includes("rate limit")) {
        continue; // Try next model
      }
      
      // If model decommissioned (400 with model_decommissioned), try next model
      if (err.message?.includes("model_decommissioned") || err.message?.includes("decommissioned")) {
        console.warn(`⚠️ ${modelName} is decommissioned, trying next model...`);
        continue; // Try next model
      }
      
      // If model not found (404), try next model
      if (err.message?.includes("404") || err.message?.includes("not found")) {
        continue; // Try next model
      }
      
      // If it's auth error (401/403), don't try other models
      if (err.message?.includes("401") || err.message?.includes("403") || err.message?.includes("API key") || err.message?.includes("unauthorized")) {
        throw err;
      }
      
      // For other errors, continue trying
      continue;
    }
  }
  
  throw lastError || new Error("All models failed");
}

app.post("/analyze", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL is required" });

    console.log("🔍 Analyzing:", url);

    // Extract domain info for analysis
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();
    const domainParts = hostname.split('.');
    const rootDomain = domainParts.length >= 2 
      ? domainParts.slice(-2).join('.') 
      : hostname;

    // Try to fetch website HTML (may fail due to CORS or network issues)
    let htmlContent = "";
    let htmlError = null;
    try {
      const response = await axios.get(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
        timeout: 10000,
        maxContentLength: 500000, // Limit to 500KB
      });
      htmlContent = response.data;
      console.log("✅ Fetched HTML, length:", htmlContent.length);
      // Limit HTML to first 5000 chars to avoid token limits (prompt is already large)
      if (htmlContent.length > 5000) {
        htmlContent = htmlContent.substring(0, 5000) + "... [truncated]";
      }
    } catch (err) {
      htmlError = err.message;
      console.warn("⚠️ Could not fetch HTML:", htmlError);
    }

    // Replace template variables in prompt
    const prompt = promptTemplate
      .replace(/\{\{URL\}\}/g, url)
      .replace(/\{\{HOSTNAME\}\}/g, hostname)
      .replace(/\{\{ROOT_DOMAIN\}\}/g, rootDomain)
      .replace(/\{\{HTML_CONTENT\}\}/g, htmlContent ? htmlContent : "(failed to fetch - use URL + common sense only)");

    console.log("📤 Sending to Groq...");
    
    const { text, model } = await tryGenerateContent(prompt);
    
    console.log("🤖 Response:", text);

    // Updated parsing for detailed format (4-5 lines)
    const lines = text.trim().split('\n').map(l => l.trim()).filter(Boolean);
    const verdict = lines[0]?.toUpperCase().trim();

    let status = "unsure";
    let isLikelyWrapper = false;
    
    // Extract verdict line (short verdict)
    const verdictLine = lines[1] || "";
    
    // Combine explanation lines (lines 2-4) for full reasoning
    const explanation = lines.slice(2).join(' ').trim() || text;

    if (verdict === "YES") {
      status = "likely";
      isLikelyWrapper = true;
    } else if (verdict === "NO") {
      status = "safe";
      isLikelyWrapper = false;
    } else if (verdict === "MAYBE") {
      status = "unsure";
    } else {
      // Fallback: try to find YES/NO/MAYBE in first line
      const firstLineUpper = lines[0]?.toUpperCase() || "";
      if (firstLineUpper.includes("YES")) {
        status = "likely";
        isLikelyWrapper = true;
      } else if (firstLineUpper.includes("NO")) {
        status = "safe";
        isLikelyWrapper = false;
      } else if (firstLineUpper.includes("MAYBE")) {
        status = "unsure";
      }
    }

    res.json({
      status,
      isLikelyWrapper,
      verdict: verdict || "UNKNOWN",
      verdictLine,
      explanation,
      matchedSignals: [
        `AI analysis (${model}): ${verdictLine || text.substring(0, 100)}`,
      ],
      aiResponse: text,
      model,
    });

  } catch (err) {
    console.error("❌ Error:", err.message);
    
    // Handle token limit errors (413)
    if (err.message?.includes("413") || err.message?.includes("too large") || err.message?.includes("Request too large") || err.message?.includes("TPM")) {
      return res.status(413).json({
        error: "Request too large",
        details: "The website content is too large to analyze. Try a smaller website or the system will automatically retry with a larger model.",
        message: err.message,
      });
    }
    
    // Handle quota errors specifically
    if (err.message?.includes("429") || err.message?.includes("quota")) {
      return res.status(429).json({
        error: "API quota exceeded",
        details: "You've exceeded your free tier quota. Please wait a few minutes or upgrade your plan.",
        help: "Check your usage at: https://ai.dev/usage?tab=rate-limit",
        message: err.message,
      });
    }
    
    res.status(500).json({ 
      error: err.message || "Analysis failed",
      details: err.message,
    });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));