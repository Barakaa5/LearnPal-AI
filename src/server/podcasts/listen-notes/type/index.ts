export type TypeOfListenNotesResults = 'episode' | 'podcast';

export interface PodcastResponse {
  rss: string; // URL to the podcast's RSS feed (requires a PRO or ENTERPRISE plan)
  description_highlighted: string; // Highlighted description of the podcast
  description_original: string; // Original description of the podcast
  title_highlighted: string; // Highlighted title of the podcast
  title_original: string; // Original title of the podcast
  publisher_highlighted: string; // Highlighted publisher name
  publisher_original: string; // Original publisher name
  image: string; // URL to the podcast's image
  thumbnail: string; // URL to the podcast's thumbnail image
  itunes_id: number; // iTunes ID of the podcast
  latest_episode_id: string; // ID of the latest episode (requires a PRO or ENTERPRISE plan)
  latest_pub_date_ms: number; // Timestamp of the latest episode's publication date in milliseconds
  earliest_pub_date_ms: number; // Timestamp of the earliest episode's publication date in milliseconds
  id: string; // Unique ID of the podcast
  genre_ids: number[]; // Array of genre IDs
  listennotes_url: string; // URL to the podcast on ListenNotes
  total_episodes: number; // Total number of episodes
  audio_length_sec: number; // Length of an average episode in seconds
  update_frequency_hours: number; // Update frequency of the podcast in hours
  email: string; // Contact email of the podcast (requires a PRO or ENTERPRISE plan)
  explicit_content: boolean; // Indicates if the podcast contains explicit content
  website: string; // URL to the podcast's website
  listen_score: string; // ListenScore of the podcast (requires a PRO or ENTERPRISE plan)
  listen_score_global_rank: string; // Global rank based on ListenScore (requires a PRO or ENTERPRISE plan)
}

export interface EpisodeResponse {
  audio: string; // URL to the episode's audio
  audio_length_sec: number; // Length of the episode in seconds
  rss: string; // URL to the episode's RSS feed (requires a PRO or ENTERPRISE plan)
  description_highlighted: string; // Highlighted description of the episode
  description_original: string; // Original description of the episode
  title_highlighted: string; // Highlighted title of the episode
  title_original: string; // Original title of the episode
  transcripts_highlighted: string[]; // Array of highlighted transcripts (if available)
  image: string; // URL to the episode's image
  thumbnail: string; // URL to the episode's thumbnail image
  itunes_id: number; // iTunes ID of the episode
  pub_date_ms: number; // Timestamp of the episode's publication date in milliseconds
  id: string; // Unique ID of the episode
  listennotes_url: string; // URL to the episode on ListenNotes
  explicit_content: boolean; // Indicates if the episode contains explicit content
  link: string; // URL to the episode's external link
  guid_from_rss: string; // GUID from the RSS feed
  podcast: {
    listennotes_url: string; // URL to the podcast on ListenNotes
    id: string; // Unique ID of the podcast
    title_highlighted: string; // Highlighted title of the podcast
    title_original: string; // Original title of the podcast
    publisher_highlighted: string; // Highlighted publisher name
    publisher_original: string; // Original publisher name
    image: string; // URL to the podcast's image
    thumbnail: string; // URL to the podcast's thumbnail image
    genre_ids: number[]; // Array of genre IDs
    listen_score: string; // ListenScore of the podcast (requires a PRO or ENTERPRISE plan)
    listen_score_global_rank: string; // Global rank based on ListenScore (requires a PRO or ENTERPRISE plan)
  };
}
