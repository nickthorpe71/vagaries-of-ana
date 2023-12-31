import { getServerSession } from "next-auth";
import { nanoid } from "nanoid";

// helpers
import { fetchRedis } from "@/helpers/redis";

// lib
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { messageValidator, Message } from "@/lib/validations/message";
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";

export async function POST(req: Request) {
    try {
        const { text, chatId }: { text: string; chatId: string } =
            await req.json();
        const session = await getServerSession(authOptions);

        // --- validation start ---

        const unAuthRes = new Response("Unauthorized", { status: 401 });

        if (!session) return unAuthRes;

        const [userId1, userId2]: string[] = chatId.split("--");

        if (session.user.id !== userId1 && session.user.id !== userId2)
            return unAuthRes;

        const friendId: string =
            session.user.id === userId1 ? userId2 : userId1;

        const friendList = (await fetchRedis(
            "smembers",
            `user:${session.user.id}:friends`
        )) as string[];

        const isFriend: boolean = friendList.includes(friendId);

        if (!isFriend) return unAuthRes;

        const rawSender: string = (await fetchRedis(
            "get",
            `user:${session.user.id}`
        )) as string;
        const sender: User = JSON.parse(rawSender) as User;

        const timestamp: number = Date.now();

        const messageData: Message = {
            id: nanoid(),
            senderId: session.user.id,
            text,
            timestamp,
        };

        const message = messageValidator.parse(messageData);

        // --- validation end ---

        // send message to all clients for this specific chat
        pusherServer.trigger(
            toPusherKey(`chat:${chatId}`),
            "incoming_message",
            message
        );

        // send message to this client anytime any chat is updated
        pusherServer.trigger(
            toPusherKey(`user:${friendId}:chats`),
            "new_message_notification",
            {
                ...message,
                senderImage: sender.image,
                senderName: sender.name,
            }
        );

        // save message to db
        await db.zadd(`chat:${chatId}:messages`, {
            score: timestamp, // score is what the db uses to sort in zsets (sorted sets)
            member: JSON.stringify(message),
        });

        return new Response("OK");
    } catch (error) {
        console.error("=======================", error);

        if (error instanceof Error)
            return new Response(error.message, { status: 500 });

        return new Response("Internal Server Error", { status: 500 });
    }
}
