import axios from 'axios';

async function getApi(query, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '37028215-499286126534f593b1eec0462';
  // параметри запиту на бекенд
  const options = {
    params: {
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: page,
      per_page: 12,
      key: API_KEY,
    },
  };

  const response = await axios.get(BASE_URL, options);
  return response;
}

export default getApi;
