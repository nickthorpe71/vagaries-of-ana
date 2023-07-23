import { getEnv } from "@/lib/utils";

const upstashRedisRestUrl = getEnv("UPSTASH_REDIS_REST_URL");
const upstashRedisRestToken = getEnv("UPSTASH_REDIS_REST_TOKEN");

type Command = "zrange" | "sismember" | "get" | "smembers" | "mget";

export async function fetchRedis(
    command: Command,
    ...args: (string | number)[]
) {
    const commandUrl = `${upstashRedisRestUrl}/${command}/${args.join("/")}`;

    const response = await fetch(commandUrl, {
        headers: {
            Authorization: `Bearer ${upstashRedisRestToken}`,
        },
        cache: "no-store",
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
            `Error executing Redis command: ${
                response.statusText
            }. Payload: ${JSON.stringify(errorData)}`
        );
    }

    const data = await response.json();
    return data.result;
}
