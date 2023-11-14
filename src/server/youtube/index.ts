import axios from 'axios';

import { YouTubeApiResponse, YouTubeVideo } from '@type/youtube';

const youtube_api_key = 'AIzaSyC8O7LTAuRcBvBR08tSgM1TwBmIQ6g8lLY';

const url = `https://www.googleapis.com/youtube/v3/search`;

export const searchYoutubeVideo = async (
  searchText: string,
  maxResults: number = 5 // default number of results per page
): Promise<YouTubeVideo[] | null> => {
  const params = {
    key: youtube_api_key,
    q: searchText,
    type: 'video',
    part: 'snippet',
    maxResults: maxResults,
  };

  try {
    const response = await axios.get<YouTubeApiResponse>(url, { params });

    const parsedYoutubeData = parsedYoutubeDataResponse(response.data);
    console.log('parsedYoutubeData', parsedYoutubeData);

    return parsedYoutubeData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const parsedYoutubeDataResponse = (
  data: YouTubeApiResponse
): YouTubeVideo[] => {
  const parsedYoutubeData = data.items.map((item) => {
    return {
      title: item.snippet.title,
      description: item.snippet.description,
      publishedAt: item.snippet.publishedAt,
      thumbnail: item.snippet.thumbnails.high.url,
      channelTitle: item.snippet.channelTitle,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    };
  });
  return parsedYoutubeData;
};
