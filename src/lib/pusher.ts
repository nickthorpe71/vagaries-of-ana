import PusherServer from "pusher";
import PusherClient from "pusher-js";
import { getEnv } from "@/lib/utils";

export const pusherServer = new PusherServer({
    appId: getEnv("PUSHER_APP_ID"),
    key: getEnv("NEXT_PUBLIC_PUSHER_APP_KEY"),
    secret: getEnv("PUSHER_APP_SECRET"),
    cluster: getEnv("us2"),
    useTLS: true, // encrypt traffic
});

export const pusherClient = new PusherClient(
    getEnv("NEXT_PUBLIC_PUSHER_APP_KEY"),
    {
        cluster: getEnv("us2"),
    }
);
