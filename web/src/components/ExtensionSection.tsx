import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BorderTrail } from '@/components/ui/border-trail';

const ExtensionSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-8 sm:py-16 border-t border-slate-200 bg-transparent">
      <div className="text-center mb-8 sm:mb-12 bg-transparent">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono text-slate-900 mb-3 sm:mb-4 tracking-tight">
          Get the Chrome <span className="from-slate-900 to-sky-800 bg-gradient-to-r text-transparent bg-clip-text">E</span><span className="text-sky-800">xtension</span>
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto mb-8 sm:mb-12">
        <Card className="relative border-slate-200 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-default rounded-lg overflow-hidden">
          <BorderTrail
            style={{
              boxShadow:
                "0px 0px 60px 30px rgb(255 255 255 / 50%), 0 0 100px 60px rgb(0 0 0 / 50%), 0 0 140px 90px rgb(0 0 0 / 50%)",
            }}
            size={100}
          />
          <CardHeader>
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center mb-4 hover:bg-sky-800 hover:scale-110 transition-all duration-200">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <CardTitle className="text-slate-900">Real-time Detection</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-slate-600">
              Automatically scans websites as you browse and alerts you to potential LLM wrappers
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="relative border-slate-200 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-default rounded-lg overflow-hidden">
          <BorderTrail
            style={{
              boxShadow:
                "0px 0px 60px 30px rgb(255 255 255 / 50%), 0 0 100px 60px rgb(0 0 0 / 50%), 0 0 140px 90px rgb(0 0 0 / 50%)",
            }}
            size={100}
          />
          <CardHeader>
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center mb-4 hover:bg-sky-800 hover:scale-110 transition-all duration-200">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <CardTitle className="text-slate-900">Privacy First</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-slate-600">
              All analysis happens locally in your browser. No data is sent to external servers
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="relative border-slate-200 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-default rounded-lg overflow-hidden">
          <BorderTrail
            style={{
              boxShadow:
                "0px 0px 60px 30px rgb(255 255 255 / 50%), 0 0 100px 60px rgb(0 0 0 / 50%), 0 0 140px 90px rgb(0 0 0 / 50%)",
            }}
            size={100}
          />
          <CardHeader>
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center mb-4 hover:bg-sky-800 hover:scale-110 transition-all duration-200">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <CardTitle className="text-slate-900">Easy to Use</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-slate-600">
              Simply click the extension icon to see detection results with a clean, intuitive interface
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <div className="text-center bg-transparent px-4">
        <Button className="bg-slate-900 hover:bg-sky-800 hover:scale-105 active:scale-95 text-white px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base lg:text-lg shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto">
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span className="whitespace-nowrap">Download Chrome Extension</span>
          </div>
        </Button>
        <p className="text-xs sm:text-sm text-slate-500 mt-3 sm:mt-4 font-light">
          Coming soon - Extension will be available for download
        </p>
      </div>
    </section>
  );
};

export default ExtensionSection;
