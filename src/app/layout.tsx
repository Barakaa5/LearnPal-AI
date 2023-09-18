import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import SessionProvider from "../client/providers/SessionProvider";
import { authOptions } from "./api/auth/[...nextauth]/options";

export const metadata: Metadata = {
  title: "My App",
  description: "My app description",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
