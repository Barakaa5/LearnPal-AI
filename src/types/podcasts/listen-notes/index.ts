import {
  EpisodeResponse,
  PodcastResponse,
} from '@server/podcasts/listen-notes/type';

export type PodcastType = {
  podcasts: PodcastResponse[];
  episodes: EpisodeResponse[];
};
