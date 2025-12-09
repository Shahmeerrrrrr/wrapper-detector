import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BorderTrail } from '@/components/ui/border-trail';
import { Typewriter } from '@/components/ui/typewriter';

interface DetectionResult {
  status: 'safe' | 'unsure' | 'likely';
  isLikelyWrapper: boolean;
  matchedSignals: string[];
  aiResponse?: string;
}

const URLChecker: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DetectionResult | null>(null);

  const handleCheck = async () => {
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    // Add https:// if no protocol
    let urlToCheck = url.trim();
    if (!urlToCheck.startsWith('http://') && !urlToCheck.startsWith('https://')) {
      urlToCheck = 'https://' + urlToCheck;
    }

    // Basic URL validation
    try {
      new URL(urlToCheck);
    } catch {
      setError('Please enter a valid URL');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Call backend API
      // In Docker, this will be the backend service URL
      // In browser, we need the external URL (localhost:8000 or production URL)
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      // For Docker, if VITE_API_URL is set to backend:8000, we need to use localhost from browser
      const finalApiUrl = apiUrl.includes('backend:') ? 'http://localhost:8000' : apiUrl;
      const response = await fetch(`${finalApiUrl}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: urlToCheck }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.details || 'Analysis failed');
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Failed to analyze website. Make sure backend is running on port 8000.');
      console.error('Analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = () => {
    if (!result) return 'bg-slate-500';
    if (result.status === 'likely') return 'bg-red-500';
    if (result.status === 'unsure') return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStatusText = () => {
    if (!result) return 'Unknown';
    if (result.status === 'likely') return 'Likely GPT Wrapper';
    if (result.status === 'unsure') return 'Unsure';
    return 'Safe';
  };

  const getStatusBadgeVariant = () => {
    if (!result) return 'secondary';
    if (result.status === 'likely') return 'destructive';
    if (result.status === 'unsure') return 'outline';
    return 'default';
  };

  return (
    <section className="mt-8 sm:mt-16 max-w-4xl mx-auto px-4 sm:px-8 lg:px-16 py-8 sm:py-16 bg-transparent">
      <div className="text-center mb-8 sm:mb-12 bg-transparent">
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-bold font-mono text-slate-900 mb-3 sm:mb-4 tracking-tight leading-tight">
          Check A<span className="from-slate-900 to-sky-800 bg-gradient-to-r text-transparent bg-clip-text">n</span><span className="text-sky-800">y</span> <span className="text-sky-800">Website</span>
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-slate-600 font-medium font-mono tracking-tight px-4">
          Paste a URL below to analyze if it's an LLM/GPT wrapper
        </p>
      </div>

      <Card className="relative shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden">
        <BorderTrail
          style={{
            boxShadow:
              "0px 0px 60px 30px rgb(255 255 255 / 50%), 0 0 100px 60px rgb(0 0 0 / 50%), 0 0 140px 90px rgb(0 0 0 / 50%)",
          }}
          size={200}
        />
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-slate-900 text-lg sm:text-xl">Website Analysis</CardTitle>
          <CardDescription className="text-slate-900 font-normal text-medium tracking-tight text-xs sm:text-sm">
            Enter a website URL to check for <span className="text-sky-800">AI wrappers</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCheck()}
              placeholder="https://b2b.com or 67.ai"
              className="flex-1 border-slate-300 sm:w-full text-slate-900 text-normal hover:border-slate-400 focus:border-zinc-500 focus:ring-zinc-600 transition-colors duration-200 h-8 sm:h-12 text-base sm:text-lg px-4 sm:px-6"
            />
            <div className="relative rounded-md overflow-hidden">
              <BorderTrail
                style={{
                  boxShadow:
                    "0px 0px 60px 30px rgb(255 255 255 / 50%), 0 0 100px 60px rgb(0 0 0 / 50%), 0 0 140px 90px rgb(0 0 0 / 50%)",
                }}
                size={60}
              />
              <Button
                onClick={handleCheck}
                disabled={loading}
                className="relative bg-sky-800 hover:bg-sky-900 active:scale-95 text-white transition-all duration-200 shadow-md hover:shadow-lg border border-sky-800 hover:border-sky-900 text-sm sm:text-base w-full sm:w-auto h-8 sm:h-12 px-6 sm:px-8 font-medium"
              >
                {loading ? 'Analyzing...' : 'Check Website'}
              </Button>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {result && (
            <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
              {/* AI Response - Main Content */}
              {result.aiResponse && (
                <div className="p-4 sm:p-5 bg-white/80 backdrop-blur-sm rounded-lg border border-slate-200 hover:bg-white/90 hover:border-slate-300 transition-all duration-200">
                  <div className="flex items-center justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-900 flex items-center justify-center hover:bg-sky-800 transition-colors duration-200 flex-shrink-0">
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <h4 className="text-base sm:text-lg font-semibold text-slate-900">AI A<span className="from-slate-900 to-sky-800 bg-gradient-to-r text-transparent bg-clip-text">n</span><span className="text-sky-800">alysis</span></h4>
                    </div>
                    {/* Status Badge */}
                    <Badge 
                      variant={getStatusBadgeVariant()} 
                      className={`text-xs sm:text-sm md:text-base px-3 sm:px-4 py-1 sm:py-1.5 hover:scale-105 tracking-tight font-medium transition-transform duration-200 cursor-pointer ${
                        result.status === 'safe' 
                          ? 'bg-green-900 hover:bg-green-800 text-white border-green-900' 
                          : result.status === 'likely'
                          ? 'bg-red-900 hover:bg-red-800 text-white border-red-900'
                          : 'bg-yellow-600 hover:bg-yellow-700 text-white border-yellow-600'
                      }`}
                    >
                      {getStatusText()}
                    </Badge>
                  </div>
                  <div className="pl-0 sm:pl-11">
                    <div className="text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed">
                      <Typewriter 
                        text={result.aiResponse} 
                        speed={20}
                        className="whitespace-pre-wrap break-words"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default URLChecker;
