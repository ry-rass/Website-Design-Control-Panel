
export type FontCategory = 'Sans' | 'Serif' | 'Display';

export interface FontConfig {
  family: string;
  category: FontCategory;
  size: number;
  weight: number;
  color: string;
  opacity: number;
  letterSpacing: number;
  lineHeight: number;
}

export type DividerType = 'line' | 'dot' | 'gradient' | 'none';

export interface DividerConfig {
  type: DividerType;
  thickness: number;
  spacing: number;
  color: string;
}

export interface DesignState {
  title: string;
  subtitle: string;
  fontConfig: FontConfig;
  dividerConfig: DividerConfig;
  layoutMode: 'classic' | 'modern-card' | 'asymmetric';
  useGradient: boolean;
  cornerRadius: number;
  shadowIntensity: 'none' | 'soft' | 'hard';
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}
