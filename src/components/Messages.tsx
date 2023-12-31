"use client";

import { FC, useRef, useState, useCallback } from "react";
import { format } from "date-fns";
import Image from "next/image";

// lib
import { Message } from "@/lib/validations/message";
import { cn } from "@/lib/utils";

// hooks
import usePusher from "@/hooks/usePusher";

interface MessagesProps {
    initialMessages: Message[];
    sessionUserId: string;
    chatId: string;
    sessionImg: string | null | undefined;
    chatPartner: User;
}

const Messages: FC<MessagesProps> = ({
    initialMessages,
    sessionUserId,
    chatId,
    chatPartner,
    sessionImg,
}) => {
    const [messages, setMessages] = useState<Message[]>(initialMessages);

    const scrollDownRef = useRef<HTMLDivElement | null>(null);

    // useCallback ensures the function retains the same reference
    // across re-renders unless one of it's dependencies changes
    const messageHandler = useCallback((message: Message) => {
        setMessages((prev) => [message, ...prev]);
    }, []);

    usePusher({
        listenChannel: `chat:${chatId}`,
        responseEventName: "incoming_message",
        responseEventHandler: messageHandler,
    });

    return (
        <div
            id='messages'
            className='flex h-full flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'
        >
            <div ref={scrollDownRef} />

            {messages.map((message, index) => {
                const isCurrentUser = message.senderId === sessionUserId;

                const hasNextMessageFromSameUser =
                    messages[index - 1]?.senderId === messages[index].senderId;

                return (
                    <div
                        id='chat-message'
                        key={`${message.id}-${message.timestamp}`}
                    >
                        <div
                            className={cn("flex items-end", {
                                "justify-end": isCurrentUser,
                            })}
                        >
                            <div
                                className={cn(
                                    "flex flex-col space-y-2 text-base max-w-xs mx-2",
                                    {
                                        "order-1 items-end": isCurrentUser,
                                        "order-2 items-start": !isCurrentUser,
                                    }
                                )}
                            >
                                <span
                                    className={cn(
                                        "px-4 py-2 rounded-lg inline-block",
                                        {
                                            "bg-indigo-600 text-white":
                                                isCurrentUser,
                                            "bg-gray-200 text-gray-900":
                                                !isCurrentUser,
                                            "rounded-br-none":
                                                !hasNextMessageFromSameUser &&
                                                isCurrentUser,
                                            "rounded-bl-none":
                                                !hasNextMessageFromSameUser &&
                                                !isCurrentUser,
                                        }
                                    )}
                                >
                                    {message.text}{" "}
                                    <span className='ml-2 text-xs text-gray-400'>
                                        {format(message.timestamp, "HH:mm")}
                                    </span>
                                </span>
                            </div>

                            <div
                                className={cn("relative w-6 h-6", {
                                    "order-2": isCurrentUser,
                                    "order-1": !isCurrentUser,
                                    invisible: hasNextMessageFromSameUser,
                                })}
                            >
                                <Image
                                    fill
                                    sizes='(max-width: 640px) 1.5rem, 1.5rem'
                                    src={
                                        isCurrentUser
                                            ? (sessionImg as string)
                                            : chatPartner.image
                                    }
                                    alt='Profile picture'
                                    referrerPolicy='no-referrer'
                                    className='rounded-full'
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Messages;
