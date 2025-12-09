import React from 'react';
import ExtensionSection from './components/ExtensionSection';
import URLChecker from './components/URLChecker';
import { Container } from './components/container';
import PixelBlast from './components/PixelBlast';

function App() {

  return (
    <div className="fixed inset-0 bg-gradient-to-t from-slate-200 to-sky-900/55 overflow-hidden">
      {/* Animated border trail wrapper */}
      <div
        className="fixed w-[95vw] sm:w-[90vw] max-w-9xl h-[95vh] sm:h-[90vh] rounded-2xl sm:rounded-3xl p-[2px] animate-border-trail"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          background: `conic-gradient(from var(--angle) at 50% 50%, transparent 70%, rgb(7 89 133), rgb(14 165 233), rgb(7 89 133), transparent 70%)`,
          '--angle': '0deg',
        } as React.CSSProperties}
      >
        {/* Main content container with rounded background */}
        <div
          className="relative max-w-9xl mx-auto w-full h-full bg-white/80 backdrop-blur-sm rounded-[20px] sm:rounded-[22px] border border-neutral-200/50 shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <PixelBlast 
            pixelSize={1.5}
            patternScale={1.5}
            patternDensity={0.8}
            liquid={false}
            enableRipples={false}
            transparent={true}
            antialias={false}
            color='#0D47A1'
            liquidWobbleSpeed={5}
            speed={0.5}
            edgeFade={0.25}
          />
          {/* Scrollable content inside the fixed container */}
          <div className="relative z-10 h-full overflow-y-auto bg-transparent">
            <Container>
              <URLChecker />
              <ExtensionSection />
              
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
