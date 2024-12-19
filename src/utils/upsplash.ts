import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY || '',
});

export interface UnsplashImage {
  url: string;
  alt: string;
  credit: {
    name: string;
    link: string;
  };
}

export async function searchUnsplashImages(query: string, count: number = 1): Promise<UnsplashImage[]> {
  try {
    const result = await unsplash.search.getPhotos({
      query,
      perPage: count,
      orientation: 'landscape',
    });

    if (!result.response) {
      throw new Error('Failed to fetch images from Unsplash');
    }

    return result.response.results.map(photo => ({
      url: photo.urls.regular,
      alt: photo.alt_description || photo.description || query,
      credit: {
        name: photo.user.name,
        link: photo.user.links.html,
      },
    }));
  } catch (error) {
    console.error('Unsplash API error:', error);
    return [];
  }
}