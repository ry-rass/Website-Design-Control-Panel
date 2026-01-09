
import React from 'react';
import { DesignState } from '../types';

interface PreviewCanvasProps {
  design: DesignState;
  image: string;
}

const PreviewCanvas: React.FC<PreviewCanvasProps> = ({ design, image }) => {
  const { fontConfig, dividerConfig, layoutMode, shadowIntensity, useGradient, cornerRadius } = design;

  // Compute styles dynamically
  const fontStyle: React.CSSProperties = {
    fontFamily: fontConfig.family === 'System UI' ? 'sans-serif' : fontConfig.family,
    fontSize: `${fontConfig.size}px`,
    fontWeight: fontConfig.weight,
    color: fontConfig.color,
    opacity: fontConfig.opacity,
    letterSpacing: `${fontConfig.letterSpacing}em`,
    lineHeight: fontConfig.lineHeight,
    transition: 'all 0.3s ease'
  };

  const shadowClass = {
    none: '',
    soft: 'shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)]',
    hard: 'shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]'
  }[shadowIntensity];

  const renderDivider = () => {
    if (dividerConfig.type === 'none') return null;

    const dividerStyles: React.CSSProperties = {
      height: dividerConfig.type === 'dot' ? `${dividerConfig.thickness}px` : `${dividerConfig.thickness}px`,
      backgroundColor: dividerConfig.type === 'gradient' ? 'transparent' : dividerConfig.color,
      backgroundImage: dividerConfig.type === 'gradient' ? `linear-gradient(to right, transparent, ${dividerConfig.color}, transparent)` : 'none',
      borderStyle: dividerConfig.type === 'dot' ? 'dotted' : 'none',
      borderWidth: dividerConfig.type === 'dot' ? `${dividerConfig.thickness}px 0 0 0` : 0,
      borderColor: dividerConfig.color,
      marginTop: `${dividerConfig.spacing}px`,
      marginBottom: `${dividerConfig.spacing}px`,
      width: '80px',
      transition: 'all 0.3s ease'
    };

    return <div style={dividerStyles} />;
  };

  return (
    <div className="w-full max-w-6xl mx-auto animate-in fade-in zoom-in duration-500">
      {/* Modern Layout Wrapper */}
      <div 
        className={`bg-white p-8 md:p-16 relative overflow-hidden flex flex-col md:flex-row gap-12 min-h-[600px] transition-all duration-500 ${shadowClass}`}
        style={{ borderRadius: `${cornerRadius}px` }}
      >
        {/* Decorative background gradient */}
        {useGradient && (
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 -z-0 pointer-events-none" />
        )}

        {/* Content Side */}
        <div className={`relative z-10 flex flex-col justify-center transition-all duration-500 ${layoutMode === 'asymmetric' ? 'md:w-5/12' : 'md:w-1/2'}`}>
          <div className="space-y-4">
             <span className="inline-block py-1 px-3 bg-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-full">
              Improved Identity
            </span>
            <h2 
              style={fontStyle}
              className="group cursor-default"
            >
              {design.title}
            </h2>
            {renderDivider()}
            <p className="text-slate-500 text-lg md:text-xl font-light leading-relaxed max-w-md">
              {design.subtitle}
            </p>
            
            <div className="pt-8 flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all hover:scale-105 shadow-lg shadow-slate-200">
                Get Started Free
              </button>
              <button className="px-8 py-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Visual Side (Uploaded Screenshot) */}
        <div className={`relative z-10 transition-all duration-700 ${layoutMode === 'asymmetric' ? 'md:w-7/12' : 'md:w-1/2'}`}>
           <div className={`relative group transition-all duration-500 overflow-hidden ${shadowClass}`} style={{ borderRadius: '24px' }}>
              <img 
                src={image} 
                alt="Layout Improvement" 
                className="w-full h-full object-cover shadow-2xl transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              
              {/* Overlay Annotations Example */}
              <div className="absolute top-4 right-4 flex gap-2">
                <div className="bg-white/90 backdrop-blur-sm p-2 rounded-lg text-[10px] font-bold shadow-sm border border-white/20">
                  Current Layout
                </div>
              </div>
           </div>
           
           {/* Complementary Card for Asymmetric Mode */}
           {layoutMode === 'asymmetric' && (
             <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 max-w-[200px] hidden lg:block animate-bounce-subtle">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Visual Match</h4>
                <p className="text-slate-500 text-[10px] mt-1">Colors and fonts optimized for your specific layout.</p>
             </div>
           )}
        </div>
      </div>

      {/* Grid Pattern Background for Canvas */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-[0.03]" 
        style={{ 
          backgroundImage: 'radial-gradient(#000 1px, transparent 0)', 
          backgroundSize: '32px 32px' 
        }} 
      />
      
      <style>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PreviewCanvas;
