export type YouTubeVideo = {
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: string;
  channelTitle: string;
  url: string;
  viewCount: string;
  likeCount: string;
  dislikeCount: string;
  commentCount: string;
  duration: string;
  channelSubscribers: string;
  channelTotalViews: string;
};

export type YouTubeApiResponse = {
  kind: string; // General type of the response
  etag: string; // ETag of the response for caching purposes
  nextPageToken: string; // Token to retrieve the next page of results
  regionCode: string; // The region code of the results
  pageInfo: {
    // Information about the pagination of results
    totalResults: number; // Total number of results available
    resultsPerPage: number; // Number of results returned per page
  };
  items: YouTubeVideoItem[]; // Array of video items
};

type YouTubeVideoItem = {
  kind: string; // General type of the item
  etag: string; // ETag of the item for caching purposes
  id: {
    kind: string; // Type of the identifier (e.g., youtube#video)
    videoId: string; // Unique identifier for the video
  };
  snippet: {
    publishedAt: string; // ISO 8601 date and time when the video was published
    channelId: string; // Unique identifier for the channel that posted the video
    title: string; // Title of the video
    description: string; // Description of the video
    thumbnails: {
      // Thumbnails of different sizes for the video
      default: YouTubeThumbnail;
      medium: YouTubeThumbnail;
      high: YouTubeThumbnail;
    };
    channelTitle: string; // Title of the channel that posted the video
    liveBroadcastContent: string; // Indicates if the video is a live broadcast
    publishTime: string; // ISO 8601 date and time when the video was made public
  };
};

export type YouTubeThumbnail = {
  url: string; // URL of the thumbnail image
  width: number; // Width of the thumbnail image
  height: number; // Height of the thumbnail image
};
