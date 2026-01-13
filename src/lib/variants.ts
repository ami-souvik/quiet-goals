export interface Variant {
  id: string;
  icon: string;
  label: string;
  verticalAlign: 'center' | 'bottom' | 'top';
  fontScale: number; // Multiplier relative to screen width
  fontWeight: number;
  opacity: number;
  letterSpacing: string;
  offsetY: number; // % of height
  lineHeight: number;
}

export const VARIANTS: Record<string, Variant> = {
  'center-soft': {
    id: 'center-soft',
    icon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg">
      <path fill="none" d="M0 0h24v24H0z"></path><path d="M8 19h3v4h2v-4h3l-4-4-4 4zm8-14h-3V1h-2v4H8l4 4 4-4zM4 11v2h16v-2H4z"></path>
    </svg>`,
    label: 'Soft',
    verticalAlign: 'center',
    fontScale: 1.0, 
    fontWeight: 400,
    opacity: 0.9,
    letterSpacing: '0.02em',
    offsetY: 0,
    lineHeight: 1.4,
  },
  'center-bold': {
    id: 'center-bold',
    icon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg">
      <path fill="none" d="M0 0h24v24H0z"></path><path d="M8 19h3v4h2v-4h3l-4-4-4 4zm8-14h-3V1h-2v4H8l4 4 4-4zM4 11v2h16v-2H4z"></path>
    </svg>`,
    label: 'Bold',
    verticalAlign: 'center',
    fontScale: 1.2,
    fontWeight: 700,
    opacity: 1.0,
    letterSpacing: '0.05em',
    offsetY: 0,
    lineHeight: 1.2,
  },
  'bottom-subtle': {
    id: 'bottom-subtle',
    icon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg">
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M16 13h-3V3h-2v10H8l4 4 4-4zM4 19v2h16v-2H4z"></path>
    </svg>`,
    label: 'Subtle',
    verticalAlign: 'bottom',
    fontScale: 0.8,
    fontWeight: 400,
    opacity: 0.8,
    letterSpacing: '0.05em',
    offsetY: -15, // Lift up by 15%
    lineHeight: 1.5,
  },
  'top-minimal': {
    id: 'top-minimal',
    icon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg">
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M8 11h3v10h2V11h3l-4-4-4 4zM4 3v2h16V3H4z"></path>
    </svg>`,
    label: 'Minimal',
    verticalAlign: 'top',
    fontScale: 0.7,
    fontWeight: 400,
    opacity: 0.85,
    letterSpacing: '0.1em',
    offsetY: 15, // Push down by 15%
    lineHeight: 1.4,
  },
};

export const getVariant = (id: string): Variant => VARIANTS[id] || VARIANTS['center-soft'];
