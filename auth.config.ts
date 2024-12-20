/* eslint-disable @typescript-eslint/no-unused-vars */
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas/validator";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import { NextAuthConfig } from "next-auth";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedValues = LoginSchema.safeParse(credentials);
        if (validatedValues.success) {
          const { email, password } = validatedValues.data;

          const user = await getUserByEmail(email);

          if (!user || !user.password) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/auth/authCallback`;
    },
  },
} satisfies NextAuthConfig;
