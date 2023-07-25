import { useEffect } from "react";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";

type PusherOptions = {
    listenChannel: string;
    responseEventName: string;
    responseEventHandler: (data: any) => void;
};

const usePusher = ({
    listenChannel,
    responseEventName,
    responseEventHandler,
}: PusherOptions) => {
    useEffect(() => {
        const formattedChannelName: string = toPusherKey(listenChannel);

        pusherClient.subscribe(formattedChannelName);
        pusherClient.bind(responseEventName, responseEventHandler);

        return () => {
            pusherClient.unsubscribe(formattedChannelName);
            pusherClient.unbind(responseEventName, responseEventHandler);
        };
    }, [listenChannel, responseEventName, responseEventHandler]);
};

export default usePusher;
