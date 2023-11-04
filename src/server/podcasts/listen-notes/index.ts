import axios from 'axios';
import { TypeOfListenNotesResults } from './type';

const API_KEY = 'b3045b127ed04712b37a5686066d7e20';

export const fetchPodcastsFromListenNotes = async (
  subject: string,
  typeOfResults: TypeOfListenNotesResults
) => {
  const response = await axios.get(
    'https://listen-api.listennotes.com/api/v2/search',
    {
      params: {
        q: subject,
        page_size: 10,

        type: typeOfResults,
      },
      headers: {
        'X-ListenAPI-Key': API_KEY,
      },
    }
  );

  return response.data.results;
};
