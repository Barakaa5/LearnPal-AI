import { fetchBooksFromGooleBooks } from '@server/books/google-books/utils';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const subject = url.searchParams.get('subject');
  if (!subject) {
    return Response.json([]);
  }

  const query = `${subject} for begginers`;
  const booksResults = await fetchBooksFromGooleBooks(query);
  return Response.json(booksResults);
}
