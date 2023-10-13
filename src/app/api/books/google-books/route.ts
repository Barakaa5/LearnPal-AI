import { fetchBooksFromGooleBooks } from '@server/books/google-books/utils';

export async function GET(request: Request) {
  const query = 'physics for begginers';
  const booksResults = await fetchBooksFromGooleBooks(query);
  return Response.json(booksResults);
}
