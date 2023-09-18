import NextAuth from 'next-auth';
import { authOptions } from './options';

// watch: https://www.youtube.com/watch?v=w2h54xz6Ndw&ab_channel=DaveGray

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
