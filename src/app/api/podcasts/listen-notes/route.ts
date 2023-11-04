import { fetchPodcastsFromListenNotes } from '@server/podcasts/listen-notes';
import {
  EpisodeResponse,
  PodcastResponse,
} from '../../../../server/podcasts/listen-notes/type';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const subject = url.searchParams.get('subject');
  if (!subject) {
    return Response.json([]);
  }

  try {
    const [podcastResults, episodeResults] = await Promise.all([
      fetchPodcastsFromListenNotes(subject, 'podcast'),
      fetchPodcastsFromListenNotes(subject, 'episode'),
    ]);

    const listenNotesResults = {
      podcasts: podcastResults as PodcastResponse,
      episodes: episodeResults as EpisodeResponse,
    };

    return Response.json(listenNotesResults);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
