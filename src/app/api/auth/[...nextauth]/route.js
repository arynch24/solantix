import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/signin", // Custom sign-in page
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account?.provider === "github") {
        token.username = profile?.login; 
        token.avatar = profile?.avatar_url; 
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.sub; // GitHub ID
      session.user.username = token.username; // GitHub Username
      session.user.image = token.avatar; // GitHub Avatar
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
