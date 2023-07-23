import { getServerSession } from "next-auth";
import { z } from "zod";

// lib
import { db } from "@/lib/db";
import { addFriendValidator } from "@/lib/validations/add-friend";
import { getEnv } from "@/lib/utils";
import { authOptions } from "@/lib/auth";

// helpers
import { fetchRedis } from "@/helpers/redis";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { email: emailToAdd } = addFriendValidator.parse(body.email);

        const idToAdd = (await fetchRedis(
            "get",
            `user:email:${emailToAdd}`
        )) as string;

        const session = await getServerSession(authOptions);

        // VALIDATIONS
        // 401: Unauthorized
        if (!session) {
            return new Response("Unauthorized", {
                status: 401,
            });
        }

        // 400: User not found
        if (!idToAdd) {
            return new Response("User not found", {
                status: 400,
            });
        }

        if (idToAdd === session.user.id) {
            return new Response("You can't add yourself as a friend", {
                status: 400,
            });
        }

        // check if user is already added
        const isAlreadyAdded = (await fetchRedis(
            "sismember",
            `user:${idToAdd}:incoming_friend_requests`,
            session.user.id
        )) as 0 | 1;

        if (isAlreadyAdded) {
            return new Response("User is already added", {
                status: 400,
            });
        }

        // check if user is already friend
        const isAlreadyFriend = (await fetchRedis(
            "sismember",
            `user:${session.user.id}:friends`,
            idToAdd
        )) as 0 | 1;

        if (isAlreadyFriend) {
            return new Response("User is already a friend", {
                status: 400,
            });
        }

        // valid request
        db.sadd(`user:${idToAdd}:incoming_friend_requests`, session.user.id);

        return new Response("OK");
    } catch (error) {
        if (error instanceof z.ZodError)
            return new Response("Invalid request payload", {
                status: 422, // Unprocessable Entity
            });

        return new Response("Invalid request", {
            status: 400,
        });
    }
}
