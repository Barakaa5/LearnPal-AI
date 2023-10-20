import axios from 'axios';

const API_KEY = 'b3045b127ed04712b37a5686066d7e20';

export const fetchPodcastsFromListenNotes = async (subject: string) => {
  const response = await axios.get(
    'https://listen-api.listennotes.com/api/v2/search',
    {
      params: {
        q: subject,
        page_size: 10,

        type: 'podcast',
      },
      headers: {
        'X-ListenAPI-Key': API_KEY,
      },
    }
  );

  return response.data.results.slice(0, 5);
};
