import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request: NextRequest) {},
  {
    callbacks: {
      authorized: async ({ token }) => {
        return Boolean(token);
      },
    },
  }
);

export const config = {
  matcher: ["/:path+"],
};
