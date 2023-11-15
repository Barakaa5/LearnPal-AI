import { searchYoutubeVideo } from '@server/youtube';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const subject = url.searchParams.get('subject');
  if (!subject) {
    return Response.json([]);
  }
  const youtubeVideo = await searchYoutubeVideo(subject);
  return Response.json(youtubeVideo);
}
