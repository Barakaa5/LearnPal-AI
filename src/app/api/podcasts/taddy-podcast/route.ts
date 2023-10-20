import { fetchPodcastsFromTaddyPodcast } from '@server/podcasts/taddy-podcast';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const subject = url.searchParams.get('subject');
  if (!subject) {
    return Response.json([]);
  }

  const podcastResults = await fetchPodcastsFromTaddyPodcast(subject);
  return Response.json(podcastResults);
}
