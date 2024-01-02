// next-auth.js
import NextAuth from 'next-auth';
import clientPromise from 'mongodb';
import bcrypt from 'bcrypt';

export default NextAuth({
  providers: [
    {
      id: 'credentials',
      name: 'Credentials',
      csrf: true,

      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const client  = await clientPromise;
        const db = client.db("lab_equipment");
        const user = await db.collection('users').findOne({ email: credentials.email });

        if (user && (await bcrypt.compare(credentials.password, user.password))) {
          return Promise.resolve(user);
        } else {
          return Promise.resolve(null);
        }
      },
    },
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: null,
  },
  callbacks: {
    session: async (session, user) => {
      const { email } = user;
      session.user.email = email;
      return Promise.resolve(session);
    },
    async csrfToken(token) {
      return token;
    },
  },
});
