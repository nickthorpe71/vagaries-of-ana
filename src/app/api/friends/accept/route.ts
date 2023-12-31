import { getServerSession } from "next-auth";
import { z } from "zod";

// lib
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";

// helpers
import { fetchRedis } from "@/helpers/redis";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { id: idToAdd } = z.object({ id: z.string() }).parse(body);

        const session = await getServerSession(authOptions);

        if (!session) {
            return new Response("Unauthorized", { status: 401 });
        }

        // verify both users are not already friends
        const areAlreadyFriends = await fetchRedis(
            "sismember",
            `user:${session.user.id}:friends`,
            idToAdd
        );

        if (areAlreadyFriends) {
            return new Response("Already friends", { status: 400 });
        }

        const hasFriendRequest = await fetchRedis(
            "sismember",
            `user:${session.user.id}:incoming_friend_requests`,
            idToAdd
        );

        if (!hasFriendRequest)
            return new Response("No friend request", { status: 400 });

        const [userRaw, friendRaw]: string[] = await Promise.all([
            fetchRedis("get", `user:${session.user.id}`),
            fetchRedis("get", `user:${idToAdd}`),
        ]);

        const user: User = JSON.parse(userRaw);
        const friend: User = JSON.parse(friendRaw);

        await Promise.all([
            pusherServer.trigger(
                toPusherKey(`user:${idToAdd}:friends`),
                "new_friend",
                user
            ),
            pusherServer.trigger(
                toPusherKey(`user:${session.user.id}:friends`),
                "new_friend",
                friend
            ),
            db.sadd(`user:${session.user.id}:friends`, idToAdd),
            db.sadd(`user:${idToAdd}:friends`, session.user.id),
            db.srem(
                `user:${session.user.id}:incoming_friend_requests`,
                idToAdd
            ),
        ]);

        return new Response("OK");
    } catch (error) {
        if (error instanceof z.ZodError)
            return new Response("Invalid request payload", { status: 422 });

        return new Response("Invalid request", { status: 400 });
    }
}
