import axios from 'axios';

import { YouTubeVideo } from '@type/youtube';

const youtube_api_key = 'AIzaSyC8O7LTAuRcBvBR08tSgM1TwBmIQ6g8lLY';

const searchUrl = 'https://www.googleapis.com/youtube/v3/search';
const videoDetailsUrl = 'https://www.googleapis.com/youtube/v3/videos';
const channelDetailsUrl = 'https://www.googleapis.com/youtube/v3/channels';

export const searchYoutubeVideo = async (
  searchText: string,
  maxResults: number = 5
): Promise<YouTubeVideo[] | null> => {
  try {
    // Search for videos
    const searchParams = {
      key: youtube_api_key,
      q: searchText,
      type: 'video',
      part: 'snippet',
      maxResults: maxResults,
    };
    const searchResponse = await axios.get(searchUrl, { params: searchParams });

    // Extract video IDs and Channel IDs
    const videoIds = searchResponse.data.items
      .map((item) => item.id.videoId)
      .join(',');
    const channelIds = searchResponse.data.items
      .map((item) => item.snippet.channelId)
      .join(',');

    // Fetch video and channel details
    const responses = await Promise.allSettled([
      axios.get(videoDetailsUrl, {
        params: {
          key: youtube_api_key,
          id: videoIds,
          part: 'snippet,statistics,contentDetails',
        },
      }),
      axios.get(channelDetailsUrl, {
        params: {
          key: youtube_api_key,
          id: channelIds,
          part: 'snippet,statistics',
        },
      }),
    ]);

    const videoDetailsResponse =
      responses[0].status === 'fulfilled'
        ? responses[0].value
        : { data: { items: [] } };
    const channelDetailsResponse =
      responses[1].status === 'fulfilled'
        ? responses[1].value
        : { data: { items: [] } };

    // Combine search results with video and channel details
    const parsedYoutubeData = searchResponse.data.items.map((item) => {
      const videoDetails = videoDetailsResponse.data.items.find(
        (detail) => detail.id === item.id.videoId
      );
      const channelDetails = channelDetailsResponse.data.items.find(
        (detail) => detail.id === item.snippet.channelId
      );

      return {
        title: item.snippet.title,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        thumbnail: item.snippet.thumbnails.high.url,
        channelTitle: item.snippet.channelTitle,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        viewCount: videoDetails?.statistics.viewCount || 'N/A',
        likeCount: videoDetails?.statistics.likeCount || 'N/A',
        dislikeCount: videoDetails?.statistics.dislikeCount || 'N/A',
        commentCount: videoDetails?.statistics.commentCount || 'N/A',
        duration: videoDetails?.contentDetails.duration || 'N/A',
        channelSubscribers: channelDetails?.statistics.subscriberCount || 'N/A',
        channelTotalViews: channelDetails?.statistics.viewCount || 'N/A',
      };
    });

    return parsedYoutubeData;
  } catch (error) {
    console.error(error);
    return null;
  }
};
