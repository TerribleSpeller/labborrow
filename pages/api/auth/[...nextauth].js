import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise  from '../../../lib/mongodb';
import bcrypt from "bcryptjs";



export const authOptions = {
    providers: [
      CredentialsProvider({
        name: "credentials",
        credentials: {},
  
      async authorize(credentials) {
          const { loginEmail, loginPassword } = credentials;
          try {
            const client  = await clientPromise;
            const db = client.db("lab_equipment");
            const userObject = await db.collection("users").findOne({ email: loginEmail });
            if (!userObject) {
              return null;
            }
            const passwordsMatch = await bcrypt.compare(loginPassword, userObject.password);
            if (!passwordsMatch) {
              return null;
            }
            //console.log("Login Suceeded")
            //console.log("User Data:", userObject)
            return userObject;

          } catch(error) {
            console.log("Error:", error)
          }
        },
      }),
    ],
    //Solution provided from here: https://stackoverflow.com/questions/64576733/where-and-how-to-change-session-user-object-after-signing-in/64595973#64595973
    callbacks: {
      jwt: async ({ token, user }) => {
        user && (token.user = user)
        delete token.user.password
        return token
    },
    session: async ({ session, token }) => {
        session.user = token.user
        return session
    }
    },
    session: {
        jwt: true,
        strategy: "jwt"
      },
      secret: process.env.NEXTAUTH_SECRET,
      pages: {
        signIn: "/login",
      },
}


export default (req, res) => NextAuth(req, res, authOptions)
