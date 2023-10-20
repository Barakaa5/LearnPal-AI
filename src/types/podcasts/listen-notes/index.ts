export type PodcastType = {
  rss: string; // The RSS feed URL of the podcast, restricted to PRO or ENTERPRISE plan
  description_highlighted: string; // Highlighted description with search terms highlighted
  description_original: string; // Original description of the podcast
  title_highlighted: string; // Highlighted title with search terms highlighted
  title_original: string; // Original title of the podcast
  publisher_highlighted: string; // Highlighted publisher name with search terms highlighted
  publisher_original: string; // Original publisher name
  image: string; // URL of the podcast's image
  thumbnail: string; // URL of the podcast's thumbnail image
  itunes_id: number; // iTunes ID of the podcast
  latest_episode_id: string; // ID of the latest episode, restricted to PRO or ENTERPRISE plan
  latest_pub_date_ms: number; // Publish date of the latest episode in milliseconds since epoch
  earliest_pub_date_ms: number; // Publish date of the earliest episode in milliseconds since epoch
  id: string; // Unique ID of the podcast
  genre_ids: string[]; // Array of genre IDs associated with the podcast
  listennotes_url: string; // ListenNotes URL of the podcast
  total_episodes: number; // Total number of episodes
  audio_length_sec: number; // Total audio length in seconds
  update_frequency_hours: number; // Update frequency in hours
  email: string; // Email address associated with the podcast, restricted to PRO or ENTERPRISE plan
  explicit_content: boolean; // Indicates whether the podcast contains explicit content
  website: string; // Website URL of the podcast
  listen_score: string; // Listen score of the podcast, restricted to PRO or ENTERPRISE plan
  listen_score_global_rank: string; // Global rank based on listen score, restricted to PRO or ENTERPRISE plan
};
