import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/api')) {
      return NextResponse.next();
    }
  },
  {
    callbacks: {
      authorized: async ({ token }) => {
        return Boolean(token);
      },
    },
  }
);

export const config = {
  matcher: ['/:path+'],
};
