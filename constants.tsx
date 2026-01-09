
import { FontConfig, FontCategory } from './types';

export const FONT_FAMILIES: Record<FontCategory, string[]> = {
  Sans: ['Inter', 'Roboto', 'Open Sans', 'System UI'],
  Serif: ['Playfair Display', 'Merriweather', 'Lora'],
  Display: ['Space Grotesk', 'Montserrat', 'Bungee']
};

export const PRESET_SIZES = {
  H1: { size: 64, label: 'Hero Title', weight: 700 },
  H2: { size: 48, label: 'Section Header', weight: 600 },
  H3: { size: 32, label: 'Sub-header', weight: 500 },
};

export const DEFAULT_DESIGN: any = {
  title: 'Design Your Future',
  subtitle: 'The modern interface for creators and innovators seeking professional clarity.',
  fontConfig: {
    family: 'Inter',
    category: 'Sans',
    size: 48,
    weight: 700,
    color: '#0f172a',
    opacity: 1,
    letterSpacing: -0.02,
    lineHeight: 1.2
  },
  dividerConfig: {
    type: 'line',
    thickness: 2,
    spacing: 24,
    color: '#3b82f6'
  },
  layoutMode: 'modern-card',
  useGradient: true,
  cornerRadius: 16,
  shadowIntensity: 'soft'
};
