// app/api/auth/[...nextauth]/route.js
import connectDB from "@/lib/mongoose";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../../models/users";
export const authOptions = {
  // Use JWT strategy for session handling
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
  await connectDB();
  console.log("Login attempt for:", credentials);

  const user = await User.findOne({ email: credentials.email });
  if (!user) {
    console.log("❌ User not found in DB");
    throw new Error("No user found with this email.");
  }

  console.log("User found, comparing passwords...");
  const isValid = await bcrypt.compare(credentials.password, user.password);
  
  if (!isValid) {
    console.log("❌ Password mismatch");
    throw new Error("Invalid password.");
  }

  console.log("✅ Auth successful for:", user.email);
  return {
    id: user._id.toString(),
    email: user.email,
    role: user.role,
    isBlocked: user.isBlocked,
  };
}
    }),
  ],
  callbacks: {
    // This callback is called whenever a JWT is created or updated
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.isBlocked = user.isBlocked;
      }
      return token;
    },
    // This callback is called whenever a session is checked (e.g., useSession())
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.isBlocked = token.isBlocked;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // Redirect to your custom login page
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
