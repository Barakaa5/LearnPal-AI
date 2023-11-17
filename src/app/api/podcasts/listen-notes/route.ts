import { fetchPodcastsFromListenNotes } from '@server/podcasts/listen-notes';
import {
  EpisodeResponse,
  PodcastResponse,
} from '@server/podcasts/listen-notes/type';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const subject = url.searchParams.get('subject');
  if (!subject) {
    return new Response(JSON.stringify([]));
  }

  try {
    const [podcastResponse, episodeResponse] = await Promise.allSettled([
      fetchPodcastsFromListenNotes(subject, 'podcast'),
      fetchPodcastsFromListenNotes(subject, 'episode'),
    ]);

    const listenNotesResults = {
      podcasts:
        podcastResponse.status === 'fulfilled'
          ? (podcastResponse.value as PodcastResponse)
          : [],
      episodes:
        episodeResponse.status === 'fulfilled'
          ? (episodeResponse.value as EpisodeResponse)
          : [],
    };

    return new Response(JSON.stringify(listenNotesResults));
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
}
