import { fetchPodcastsFromListenNotes } from '@server/podcasts/listen-notes';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const subject = url.searchParams.get('subject');
  if (!subject) {
    return Response.json([]);
  }

  const podcastResults = await fetchPodcastsFromListenNotes(subject);
  return Response.json(podcastResults);
}
