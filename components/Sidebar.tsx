
import React from 'react';
import { DesignState, FontCategory, DividerType } from '../types';
import { FONT_FAMILIES, PRESET_SIZES } from '../constants';

interface SidebarProps {
  design: DesignState;
  onUpdate: (updates: Partial<DesignState>) => void;
  feedback: string | null;
  isAnalyzing: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ design, onUpdate, feedback, isAnalyzing }) => {
  const { fontConfig, dividerConfig } = design;

  const updateFont = (updates: Partial<typeof fontConfig>) => {
    onUpdate({ fontConfig: { ...fontConfig, ...updates } });
  };

  const updateDivider = (updates: Partial<typeof dividerConfig>) => {
    onUpdate({ dividerConfig: { ...dividerConfig, ...updates } });
  };

  const contrastRatio = () => {
    // Basic luminance check (simplified for UI feedback)
    const color = fontConfig.color.replace('#', '');
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 125 ? 'Low Contrast' : 'High Contrast';
  };

  return (
    <div className="p-6 space-y-8 pb-12">
      {/* AI Suggestion Section */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Gemini Design Advisor</h3>
        </div>
        {feedback ? (
          <div className="text-sm text-slate-600 leading-relaxed max-h-40 overflow-y-auto pr-2">
             {feedback}
          </div>
        ) : (
          <p className="text-sm text-slate-400 italic">Upload an image to get AI feedback...</p>
        )}
      </div>

      {/* Typography Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">Typography System</h2>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${contrastRatio() === 'High Contrast' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
            {contrastRatio()}
          </span>
        </div>

        <div className="space-y-4">
          {/* Presets */}
          <div className="flex gap-2">
            {(Object.entries(PRESET_SIZES) as [keyof typeof PRESET_SIZES, any][]).map(([key, preset]) => (
              <button
                key={key}
                onClick={() => updateFont({ size: preset.size, weight: preset.weight })}
                className={`flex-1 py-2 text-xs font-bold border rounded-lg transition-all ${fontConfig.size === preset.size ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}
              >
                {key}
              </button>
            ))}
          </div>

          {/* Font Family */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500">Font Family</label>
            <select 
              value={fontConfig.family}
              onChange={(e) => updateFont({ family: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {(Object.entries(FONT_FAMILIES) as [FontCategory, string[]][]).map(([category, families]) => (
                <optgroup key={category} label={category}>
                  {families.map(f => <option key={f} value={f}>{f}</option>)}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Font Size Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-500">Font Size</label>
              <input 
                type="number" 
                value={fontConfig.size}
                onChange={(e) => updateFont({ size: parseInt(e.target.value) || 0 })}
                className="w-12 text-center text-xs border-b border-slate-200 outline-none focus:border-blue-500"
              />
            </div>
            <input 
              type="range" min="12" max="120" 
              value={fontConfig.size}
              onChange={(e) => updateFont({ size: parseInt(e.target.value) })}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Color & Opacity */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500">Color (HEX)</label>
              <div className="flex gap-2">
                <input 
                  type="color" 
                  value={fontConfig.color}
                  onChange={(e) => updateFont({ color: e.target.value })}
                  className="w-10 h-10 p-0.5 rounded-lg border border-slate-200 bg-white cursor-pointer"
                />
                <input 
                  type="text" 
                  value={fontConfig.color}
                  onChange={(e) => updateFont({ color: e.target.value })}
                  className="w-full text-xs px-2 py-2 border border-slate-200 rounded-lg bg-slate-50 font-mono"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500">Opacity</label>
              <div className="flex items-center gap-2 h-10">
                 <input 
                  type="range" min="0" max="1" step="0.1"
                  value={fontConfig.opacity}
                  onChange={(e) => updateFont({ opacity: parseFloat(e.target.value) })}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider System */}
      <section>
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Text Divider</h2>
        <div className="space-y-4">
          <div className="flex gap-2">
            {(['none', 'line', 'dot', 'gradient'] as DividerType[]).map((type) => (
              <button
                key={type}
                onClick={() => updateDivider({ type })}
                className={`flex-1 py-2 text-[10px] font-bold border rounded-lg capitalize transition-all ${dividerConfig.type === type ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}
              >
                {type}
              </button>
            ))}
          </div>

          {dividerConfig.type !== 'none' && (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500">Thickness & Spacing</label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400">H:</span>
                    <input 
                      type="number" value={dividerConfig.thickness}
                      onChange={(e) => updateDivider({ thickness: parseInt(e.target.value) || 1 })}
                      className="w-full text-xs px-2 py-1.5 border border-slate-200 rounded-lg bg-slate-50"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400">G:</span>
                    <input 
                      type="number" value={dividerConfig.spacing}
                      onChange={(e) => updateDivider({ spacing: parseInt(e.target.value) || 1 })}
                      className="w-full text-xs px-2 py-1.5 border border-slate-200 rounded-lg bg-slate-50"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500">Divider Color</label>
                <input 
                  type="color" 
                  value={dividerConfig.color}
                  onChange={(e) => updateDivider({ color: e.target.value })}
                  className="w-full h-8 p-1 rounded-lg border border-slate-200 cursor-pointer"
                />
              </div>
            </>
          )}
        </div>
      </section>

      {/* Layout Improvements */}
      <section>
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Layout Architecture</h2>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500">Grid Strategy</label>
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => onUpdate({ layoutMode: 'modern-card' })}
                className={`w-full py-2 px-3 text-left text-sm font-medium border rounded-xl flex items-center justify-between transition-all ${design.layoutMode === 'modern-card' ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
              >
                <span>Balanced Card Grid</span>
                <div className="flex gap-0.5">
                  <div className="w-2 h-2 rounded-sm bg-current opacity-40" />
                  <div className="w-2 h-2 rounded-sm bg-current opacity-40" />
                </div>
              </button>
              <button
                onClick={() => onUpdate({ layoutMode: 'asymmetric' })}
                className={`w-full py-2 px-3 text-left text-sm font-medium border rounded-xl flex items-center justify-between transition-all ${design.layoutMode === 'asymmetric' ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
              >
                <span>Asymmetric Focus</span>
                <div className="flex items-end gap-0.5">
                  <div className="w-2 h-3 rounded-sm bg-current opacity-40" />
                  <div className="w-2 h-2 rounded-sm bg-current opacity-40" />
                </div>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between py-2 border-t border-slate-100">
            <label className="text-sm font-medium text-slate-700">Subtle Gradients</label>
            <button 
              onClick={() => onUpdate({ useGradient: !design.useGradient })}
              className={`w-10 h-5 rounded-full transition-colors relative ${design.useGradient ? 'bg-blue-600' : 'bg-slate-300'}`}
            >
              <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${design.useGradient ? 'left-6' : 'left-1'}`} />
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500">Shadow Depth</label>
            <div className="flex gap-2">
              {(['none', 'soft', 'hard'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => onUpdate({ shadowIntensity: s })}
                  className={`flex-1 py-1.5 text-xs font-bold border rounded-lg capitalize transition-all ${design.shadowIntensity === s ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sidebar;
