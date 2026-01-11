export interface Mood {
  id: string;
  label: string;
  bgColor: string;
  textColor: string;
  fontFamily: string;
  fontFile: string;
  uppercase: boolean;
  scalingFactor: number;
}

export const MOODS: Record<string, Mood> = {
  calm: {
    id: 'calm',
    label: 'Calm',
    bgColor: '#F0F4F8',
    textColor: '#486581',
    fontFamily: 'var(--font-roboto), sans-serif',
    fontFile: 'Roboto-Regular.ttf',
    uppercase: false,
    scalingFactor: 1.0,
  },
  focused: {
    id: 'focused',
    label: 'Focused',
    bgColor: '#FFFFFF',
    textColor: '#111827',
    fontFamily: 'var(--font-roboto), sans-serif',
    fontFile: 'Roboto-Regular.ttf',
    uppercase: false,
    scalingFactor: 0.85,
  },
  grounded: {
    id: 'grounded',
    label: 'Grounded',
    bgColor: '#FDF6E3',
    textColor: '#5D4037',
    fontFamily: 'var(--font-playfair), serif',
    fontFile: 'PlayfairDisplay-Regular.ttf',
    uppercase: false,
    scalingFactor: 1.15,
  },
  ambitious: {
    id: 'ambitious',
    label: 'Ambitious',
    bgColor: '#000000',
    textColor: '#FFFFFF',
    fontFamily: 'var(--font-oswald), sans-serif',
    fontFile: 'Oswald-Bold.ttf',
    uppercase: true,
    scalingFactor: 1.6,
  },
};

export const getMood = (id: string): Mood => MOODS[id] || MOODS.calm;
