import axios from 'axios';

export default async function getImages(searchQuery, page = 1) {
  try {
    const BASE_URL = `https://pixabay.com/api/`;
    const searchParams = new URLSearchParams({
      key: '29306841-b1a7c1605907e307c246cc444',
      q: `${searchQuery}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: `${page}`,
      per_page: 12,
    });

    const response = await axios(`${BASE_URL}/?${searchParams}`);

    return response;
  } catch (error) {
    throw new Error(error);
  }
}