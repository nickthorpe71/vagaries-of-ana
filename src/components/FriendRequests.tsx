"use client";

import { FC, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Check, UserPlus, X } from "lucide-react";
import axios from "axios";

// hooks
import usePusher from "@/hooks/usePusher";

interface FriendRequestsProps {
    incomingFriendRequests: IncomingFriendRequest[];
    sessionId: string;
}

enum FriendRequestAction {
    ACCEPT = "accept",
    DENY = "deny",
}

const FriendRequests: FC<FriendRequestsProps> = ({
    incomingFriendRequests,
    sessionId,
}) => {
    const router = useRouter();
    const [friendRequests, setFriendRequests] = useState<
        IncomingFriendRequest[]
    >(incomingFriendRequests);
    const [canRespond, setCanRespond] = useState<boolean>(true);

    // useCallback ensures the function retains the same reference
    // across re-renders unless one of it's dependencies changes
    const friendRequestHandler = useCallback(
        ({ senderId, senderEmail }: IncomingFriendRequest) => {
            setFriendRequests((prev) => [...prev, { senderId, senderEmail }]);
        },
        []
    );

    usePusher({
        listenChannel: `user:${sessionId}:incoming_friend_requests`,
        responseEventName: "incoming_friend_requests",
        responseEventHandler: friendRequestHandler,
    });

    const handleFriendRequest = async (
        senderId: string,
        action: FriendRequestAction
    ) => {
        if (!canRespond) return;

        setCanRespond(false);
        await axios.post(`/api/friends/${action}`, { id: senderId });

        setFriendRequests((prev) =>
            prev.filter((request) => request.senderId !== senderId)
        );

        router.refresh();

        setCanRespond(true);
    };

    return (
        <>
            {friendRequests.length === 0 ? (
                <p className='text-sm text-zinc-500'>Nothing to show here...</p>
            ) : (
                friendRequests.map((request) => (
                    <div
                        key={request.senderId}
                        className='flex gap-4 items-center'
                    >
                        <UserPlus className='text-black' />
                        <p className='font-medium text-lg'>
                            {request.senderEmail}
                        </p>
                        <button
                            onClick={() =>
                                handleFriendRequest(
                                    request.senderId,
                                    FriendRequestAction.ACCEPT
                                )
                            }
                            aria-label='accept friend'
                            className='w-8 h-8 bg-indigo-600 hover:bg-indigo-700 grid place-items-center rounded-full transition hover:shadow-md'
                        >
                            <Check className='font-semibold text-white w-3/4 h-3/4' />
                        </button>

                        <button
                            onClick={() =>
                                handleFriendRequest(
                                    request.senderId,
                                    FriendRequestAction.DENY
                                )
                            }
                            aria-label='deny friend'
                            className='w-8 h-8 bg-red-600 hover:bg-red-700 grid place-items-center rounded-full transition hover:shadow-md'
                        >
                            <X className='font-semibold text-white w-3/4 h-3/4' />
                        </button>
                    </div>
                ))
            )}
        </>
    );
};

export default FriendRequests;
