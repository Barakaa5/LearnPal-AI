import axios from 'axios';
import { TypeOfListenNotesResults } from './type';

const API_KEY = process.env.LISTEN_NOTES_API_KEY || '';

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
