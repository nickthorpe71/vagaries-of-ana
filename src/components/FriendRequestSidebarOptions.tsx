"use client";

import { FC, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { User } from "lucide-react";

// hooks
import usePusher from "@/hooks/usePusher";

interface FriendRequestSidebarOptionsProps {
    sessionUserId: string;
    initialUnseenRequestCount: number;
}

const FriendRequestSidebarOptions: FC<FriendRequestSidebarOptionsProps> = ({
    sessionUserId,
    initialUnseenRequestCount,
}) => {
    const [unseenRequestCount, setUnseenRequestCount] = useState<number>(
        initialUnseenRequestCount
    );

    const friendRequestHandler = useCallback(() => {
        setUnseenRequestCount((prev) => prev + 1);
    }, []);
    usePusher({
        listenChannel: `user:${sessionUserId}:incoming_friend_requests`,
        responseEventName: "incoming_friend_requests",
        responseEventHandler: friendRequestHandler,
    });

    const addedFriendHandler = useCallback(() => {
        setUnseenRequestCount((prev) => prev - 1);
    }, []);
    usePusher({
        listenChannel: `user:${sessionUserId}:friends`,
        responseEventName: "new_friend",
        responseEventHandler: addedFriendHandler,
    });

    return (
        <Link
            href='/main-menu/requests'
            className='text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
        >
            <div className='text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'>
                <User className='h-4 w-4' />
            </div>
            <p className='truncate'>Friend requests</p>

            {unseenRequestCount > 0 ? (
                <div className='rounded-full w-5 h-5 text-xs flex justify-center items-center text-white bg-indigo-600'>
                    {unseenRequestCount}
                </div>
            ) : null}
        </Link>
    );
};

export default FriendRequestSidebarOptions;
