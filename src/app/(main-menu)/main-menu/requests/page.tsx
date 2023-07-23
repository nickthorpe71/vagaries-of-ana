import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

// components
import FriendRequests from "@/components/FriendRequests";

// lib
import { authOptions } from "@/lib/auth";

// helpers
import { fetchRedis } from "@/helpers/redis";

const RequestPage = async () => {
    const session = await getServerSession(authOptions);
    if (!session) notFound();

    // ids of people who sent current logged in user a friend requests
    const incomingSenderIds = (await fetchRedis(
        "smembers",
        `user:${session.user.id}:incoming_friend_requests`
    )) as string[];

    // prepare all the keys to fetch
    const keys: string[] = incomingSenderIds.map(
        (senderId) => `user:${senderId}`
    );

    // fetch all the values for those keys at once
    const senders: any[] =
        keys.length === 0 ? [] : await fetchRedis("mget", ...keys);

    // process the fetched data
    const incomingFriendRequests = senders.map((sender: any, index: number) => {
        const senderParsed = JSON.parse(sender) as User;
        return {
            senderId: incomingSenderIds[index],
            senderEmail: senderParsed.email,
        };
    });

    return (
        <main className='pt-8'>
            <h1 className='font-bold text-5xl mb-8'>Add a friend</h1>
            <div className='flex flex-col gap-4'>
                <FriendRequests
                    incomingFriendRequests={incomingFriendRequests}
                    sessionId={session.user.id}
                />
            </div>
        </main>
    );
};

export default RequestPage;
