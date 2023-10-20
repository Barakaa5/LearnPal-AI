import axios from 'axios';

const API_KEY =
  '6a0444517e3d83812dc0b5ecee8fa7887823bbf9b0ceb58926def20f054bc3404632d727b78e50b2b237216782a03cbeeb';
const USER_ID = 682;

export const fetchPodcastsFromTaddyPodcast = async (subject: string) => {
  const response = await axios.post(
    'https://api.taddy.org',
    {
      query: `{searchForTerm(term:"${subject}"){ podcastSeries{uuid name rssUrl}}}`,
      //   query: `{searchForTerm(term:"${subject}", filterForTypes:PODCASTSERIES, isSafeMode:true, searchResultsBoostType:BOOST_POPULARITY_A_LOT){searchId podcastSeries{uuid name rssUrl}}}`,
    },
    // {
    //   query:
    //     '{ getPodcastSeries(name:"This American Life") {uuid name itunesId description imageUrl itunesInfo{ uuid baseArtworkUrlOf(size:640)} } }',
    // },
    {
      headers: {
        'X-USER-ID': USER_ID,
        'X-API-KEY': API_KEY,
        'Content-Type': 'application/json',
      },
    }
  );

  console.log('response.data', response.data);

  return response.data;
};
