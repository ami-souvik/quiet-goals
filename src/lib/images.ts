import { Mood } from './moods';

const PIXABAY_API_KEY = process.env.NEXT_PUBLIC_PIXABAY_API_KEY;
const API_URL = 'https://pixabay.com/api/';

export async function fetchMoodImage(mood: Mood): Promise<string | null> {
  if (!PIXABAY_API_KEY) {
    // If no key is present, we log a warning once (or just return null silently to fallback to procedural)
    // For development visibility, we'll log it.
    if (typeof window !== 'undefined' && !(window as any)._pixabayWarned) {
      console.warn('Pixabay API key not configured (NEXT_PUBLIC_PIXABAY_API_KEY). Using procedural backgrounds.');
      (window as any)._pixabayWarned = true;
    }
    return null;
  }

  try {
    const params = new URLSearchParams({
      key: PIXABAY_API_KEY,
      q: mood.image.searchQuery,
      image_type: 'photo',
      category: 'backgrounds', // nature, backgrounds
      safesearch: 'true',
      editors_choice: 'true',
      per_page: '20', 
      min_width: '1600'
    });

    const response = await fetch(`${API_URL}?${params.toString()}`);
    if (!response.ok) {
        console.error('Pixabay API error:', response.statusText);
        return null;
    }

    const data = await response.json();
    if (data.hits && data.hits.length > 0) {
      // Pick a random image from the top results to ensure variety within the mood
      const randomIndex = Math.floor(Math.random() * Math.min(data.hits.length, 10));
      return data.hits[randomIndex].largeImageURL; // or webformatURL for smaller
    }
  } catch (error) {
    console.error('Failed to fetch Pixabay image', error);
  }

  return null;
}
