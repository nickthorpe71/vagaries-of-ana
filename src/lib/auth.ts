import { NextAuthOptions } from "next-auth";
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import GoogleProvider from "next-auth/providers/google";

// lib
import { db } from "./db";
import { getEnv } from "./utils";

// helpers
import { fetchRedis } from "@/helpers/redis";

export const authOptions: NextAuthOptions = {
    adapter: UpstashRedisAdapter(db),
    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: "/login",
    },
    providers: [
        GoogleProvider({
            clientId: getEnv("GOOGLE_CLIENT_ID"),
            clientSecret: getEnv("GOOGLE_CLIENT_SECRET"),
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            const dbUserResult = (await fetchRedis(
                "get",
                `user:${token.id}`
            )) as string | null;

            if (!dbUserResult) {
                if (user) {
                    token.id = user!.id;
                }

                return token;
            }

            const dbUser = JSON.parse(dbUserResult) as User;

            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                picture: dbUser.image,
            };
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.picture;
            }

            return session;
        },
        redirect() {
            return "/main-menu";
        },
    },
};
