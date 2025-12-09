# Testing Checklist - WrapperDetector

## Prerequisites
- [ ] Node.js installed (v18+)
- [ ] npm or yarn installed
- [ ] Groq API key in `back/.env` file as `AI_API_KEY`

## Backend Testing

### 1. Install Dependencies
```bash
cd back
npm install
```

### 2. Environment Setup
Create `back/.env` file:
```
AI_API_KEY=your_groq_api_key_here
PORT=8000
```

### 3. Test Backend Locally
```bash
cd back
npm start
```

**Expected Output:**
- Server should start on port 8000
- Console should show: "Server running on port 8000"

### 4. Test Health Check Endpoint
Open browser or use curl:
```bash
curl http://localhost:8000/
```

**Expected Response:**
```json
{"message":"WrapperDetector API is running"}
```

### 5. Test Analyze Endpoint
```bash
curl -X POST http://localhost:8000/analyze \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com"}'
```

**Expected Response:**
- Status 200
- JSON with `status`, `isLikelyWrapper`, `aiResponse`, etc.

**Common Issues:**
- ❌ Port already in use → Change PORT in .env
- ❌ API key invalid → Check `AI_API_KEY` in .env
- ❌ Module not found → Run `npm install` in back directory

## Frontend Testing

### 1. Install Dependencies
```bash
cd web
npm install
```

### 2. Environment Setup (Optional - for production)
Create `web/.env` file (only needed if deploying):
```
VITE_API_URL=https://your-backend-url.com
```

For local development, it defaults to `http://localhost:8000`

### 3. Test Frontend Locally
```bash
cd web
npm run dev
```

**Expected Output:**
- Vite dev server starts on port 3000
- Browser opens automatically
- You should see the WrapperDetector UI

### 4. Test URL Checker
1. Enter a test URL (e.g., `https://example.com`)
2. Click "Check Website"
3. Wait for analysis (should show loading state)
4. Verify response appears with:
   - Status badge (Safe/Likely GPT Wrapper/Unsure)
   - AI Analysis section with typewriter effect
   - Detailed explanation

**Test URLs to Try:**
- `https://gemini.google.com` → Should show "Safe" (official Google product)
- `https://chat.openai.com` → Should show "Safe" (official OpenAI product)
- `https://example.com` → Should analyze and provide verdict

**Common Issues:**
- ❌ "Failed to analyze website" → Check if backend is running
- ❌ CORS error → Backend CORS is configured, check backend is running
- ❌ Network error → Verify backend URL in browser console

## Integration Testing

### 1. Full Flow Test
1. Start backend: `cd back && npm start`
2. Start frontend: `cd web && npm run dev`
3. Open browser to `http://localhost:3000`
4. Test multiple URLs
5. Verify all UI elements work:
   - Input field accepts URLs
   - Button triggers analysis
   - Loading state appears
   - Results display correctly
   - Typewriter effect works
   - Status badge shows correct color

### 2. Error Handling Test
- Test with invalid URL → Should show error message
- Test with empty input → Should show validation error
- Stop backend → Should show connection error
- Test with very long URL → Should handle gracefully

## Build Testing

### 1. Build Frontend
```bash
cd web
npm run build
```

**Expected Output:**
- `dist/` folder created
- No build errors
- All assets bundled

### 2. Preview Production Build
```bash
cd web
npm run preview
```

**Expected:**
- Production build runs locally
- UI looks correct
- API calls work (if backend is running)

## Pre-Deployment Checklist

- [ ] Backend runs locally without errors
- [ ] Frontend runs locally without errors
- [ ] API endpoints respond correctly
- [ ] Frontend can communicate with backend
- [ ] Error handling works (invalid URLs, network errors)
- [ ] All UI components render correctly
- [ ] Typewriter effect works
- [ ] Status badges show correct colors
- [ ] Production build succeeds
- [ ] No console errors in browser
- [ ] Environment variables are set correctly

## Known Issues to Check

1. **Prompt file loading**: Verify `prompt.txt` exists in `back/` directory
2. **Groq API limits**: Check if you have API quota remaining
3. **CORS**: Backend should allow all origins (configured for development)
4. **Port conflicts**: Ensure ports 3000 and 8000 are available

