"use client";

import { FC, useEffect, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

// components
import NewMessageToast from "@/components/NewMessageToast";

// hooks
import usePusher from "@/hooks/usePusher";

// lib
import { chatHrefConstructor } from "@/lib/utils";
import { Message } from "@/lib/validations/message";

interface SidebarChatListProps {
    sessionUserId: string;
    friends: User[];
}

interface MessageNotification extends Message {
    senderImage: string;
    senderName: string;
}

const SidebarChatList: FC<SidebarChatListProps> = ({
    sessionUserId,
    friends,
}) => {
    const router = useRouter();
    const pathname = usePathname(); // relative url path

    // this will only show the new message you've received while you are online
    const [unseenMessages, setUnseenMessages] = useState<Message[]>([]);
    const [activeChats, setActiveChats] = useState<User[]>(friends);

    const newMessageNotificationHandler = useCallback(
        (messageNotification: MessageNotification) => {
            const shouldNotify: boolean =
                pathname !==
                `/main-menu/chat/${chatHrefConstructor(
                    sessionUserId,
                    messageNotification.senderId
                )}`;

            if (!shouldNotify) return;

            toast.custom((t) => (
                <NewMessageToast
                    t={t}
                    sessionId={sessionUserId}
                    senderId={messageNotification.senderId}
                    senderImg={messageNotification.senderImage}
                    senderName={messageNotification.senderName}
                    senderMessage={messageNotification.text}
                />
            ));

            setUnseenMessages((prev: Message[]) => [
                ...prev,
                {
                    id: messageNotification.id,
                    senderId: messageNotification.senderId,
                    text: messageNotification.text,
                    timestamp: messageNotification.timestamp,
                },
            ]);
        },
        [pathname, sessionUserId]
    );
    usePusher({
        listenChannel: `user:${sessionUserId}:chats`,
        responseEventName: "new_message_notification",
        responseEventHandler: newMessageNotificationHandler,
    });

    const newFriendHandler = useCallback((newFriend: User) => {
        setActiveChats((prev: User[]) => [...prev, newFriend]);
    }, []);
    usePusher({
        listenChannel: `user:${sessionUserId}:friends`,
        responseEventName: "new_friend",
        responseEventHandler: newFriendHandler,
    });

    useEffect(() => {
        if (pathname?.includes("chat"))
            setUnseenMessages((prev: Message[]) =>
                prev.filter(
                    (message: Message) => !pathname.includes(message.senderId)
                )
            );
    }, [pathname]);

    return (
        <ul
            role='list'
            className='max-h-[25-rem] overflow-y-auto -mx-2 space-y-1'
        >
            {friends.sort().map((friend: User) => {
                const unseenMessageCount: number = unseenMessages.filter(
                    (unseenMsg: Message) => unseenMsg.senderId === friend.id
                ).length;

                return (
                    <li key={friend.id}>
                        <a // using an anchor tag vs a Link because we want a hard refresh
                            href={`/main-menu/chat/${chatHrefConstructor(
                                sessionUserId,
                                friend.id
                            )}`}
                            className='text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                        >
                            {friend.name}
                            {unseenMessageCount > 0 ? (
                                <div className='rounded-full w-4 h-4 text-xs flex font-medium justify-center items-center text-white bg-indigo-600'>
                                    {unseenMessageCount}
                                </div>
                            ) : null}
                        </a>
                    </li>
                );
            })}
        </ul>
    );
};

export default SidebarChatList;
