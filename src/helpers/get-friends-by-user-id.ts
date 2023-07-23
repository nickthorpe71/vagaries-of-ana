import { fetchRedis } from "./redis";

export const getFriendsByUserId = async (userId: string): Promise<User[]> => {
    if (!userId)
        throw new Error(
            `User ID is required. ${userId} is not a valid User ID.`
        );

    const friendIds: string[] = await fetchRedis(
        "smembers",
        `user:${userId}:friends`
    );

    if (friendIds.length === 0) return [];

    const friends: User[] = (
        await fetchRedis(
            "mget",
            ...friendIds.map((friendId: string) => `user:${friendId}`)
        )
    ).map((friendRes: string) => JSON.parse(friendRes)) as User[];

    return friends;
};
