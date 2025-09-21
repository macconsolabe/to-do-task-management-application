import { useSettings } from '../../contexts/SettingsContext';

export function useTheme() {
  const { settings } = useSettings();

  // Get color values based on selected accent
  const getAccentColor = () => {
    switch (settings.theme.colorAccent) {
      case 'golden':
        return '#F4C430';
      case 'silver':
        return '#C0C0C0';
      case 'copper':
        return '#B87333';
      default:
        return '#F4C430';
    }
  };

  const getAccentColorSecondary = () => {
    switch (settings.theme.colorAccent) {
      case 'golden':
        return '#e6b800';
      case 'silver':
        return '#A8A8A8';
      case 'copper':
        return '#A0522D';
      default:
        return '#e6b800';
    }
  };

  // Get metallic gradient based on intensity
  const getMetallicGradient = () => {
    const baseGradient = 'linear-gradient(145deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%)';
    
    switch (settings.theme.intensity) {
      case 'subtle':
        return 'linear-gradient(145deg, #fafbfc 0%, #f1f3f4 50%, #fafbfc 100%)';
      case 'normal':
        return baseGradient;
      case 'enhanced':
        return 'linear-gradient(145deg, #e8eaed 0%, #d1d5db 30%, #f1f3f4 70%, #e8eaed 100%)';
      default:
        return baseGradient;
    }
  };

  // Get metallic shadow based on intensity
  const getMetallicShadow = () => {
    switch (settings.theme.intensity) {
      case 'subtle':
        return 'inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(0,0,0,0.05), 0 4px 15px rgba(0,0,0,0.05)';
      case 'normal':
        return 'inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.1), 0 4px 15px rgba(0,0,0,0.05)';
      case 'enhanced':
        return 'inset 0 2px 4px rgba(255,255,255,0.9), inset 0 -2px 4px rgba(0,0,0,0.15), 0 20px 40px rgba(0,0,0,0.2)';
      default:
        return 'inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.1), 0 4px 15px rgba(0,0,0,0.05)';
    }
  };

  // Get accent gradient for buttons
  const getAccentGradient = () => {
    const primary = getAccentColor();
    const secondary = getAccentColorSecondary();
    return `linear-gradient(145deg, ${primary} 0%, ${secondary} 50%, ${primary} 100%)`;
  };

  // Get reflection overlay based on intensity
  const getReflectionOverlay = () => {
    switch (settings.theme.intensity) {
      case 'subtle':
        return 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.1) 100%)';
      case 'normal':
        return 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.2) 100%)';
      case 'enhanced':
        return 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 25%, transparent 75%, rgba(255,255,255,0.3) 100%)';
      default:
        return 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.2) 100%)';
    }
  };

  return {
    settings: settings.theme,
    accentColor: getAccentColor(),
    accentColorSecondary: getAccentColorSecondary(),
    metallicGradient: getMetallicGradient(),
    metallicShadow: getMetallicShadow(),
    accentGradient: getAccentGradient(),
    reflectionOverlay: getReflectionOverlay()
  };
}
