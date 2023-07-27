import { getServerSession } from "next-auth/next";
import { notFound } from "next/navigation";
import Image from "next/image";

// lib
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import {
    messageArrayValidator,
    Message as ValidatedMessage,
} from "@/lib/validations/message";

// helpers
import { fetchRedis } from "@/helpers/redis";

// components
import Messages from "@/components/Messages";
import ChatInput from "@/components/ChatInput";

interface ChatPageProps {
    params: {
        chatId: string; // passed to this component based on the file routing /chat/[chatId]/ChatPage.tsx
    };
}

async function getChatMessages(chatId: string) {
    try {
        const results: string[] = await fetchRedis(
            "zrange",
            `chat:${chatId}:messages`,
            0,
            -1
        );

        const dbMessages: Message[] = results.map(
            (message: string) => JSON.parse(message) as Message
        );

        const reversedDbMessages: Message[] = dbMessages.reverse();

        const messages: ValidatedMessage[] =
            messageArrayValidator.parse(reversedDbMessages);

        return messages;
    } catch (error) {
        notFound();
    }
}

const ChatPage = async ({ params }: ChatPageProps) => {
    const session = await getServerSession(authOptions);
    if (!session) return notFound();

    const { chatId } = params;
    const { user } = session;
    const [userId1, userId2]: string[] = chatId.split("--");

    // only allow users to access a chat that they are a part of
    if (user.id !== userId1 && user.id !== userId2) return notFound();

    const chatPartnerId: string = user.id === userId1 ? userId2 : userId1;
    const chatPartnerRaw: string = await fetchRedis(
        "get",
        `user:${chatPartnerId}`
    );
    const chatPartner: User = JSON.parse(chatPartnerRaw);
    const initialMessages: Array<{
        id: string;
        senderId: string;
        text: string;
        timestamp: number;
    }> = await getChatMessages(chatId);

    return (
        <div className='flex-1 justify-between flex flex-col h-full max-h-[calc(100vh-6rem)]'>
            <div className='flex sm:items-center justify-between py-3 border-b-2 border-gray-200'>
                <div className='relative flex items-center space-x-4'>
                    <div className='relative'>
                        <div className='relative w-8 sm:w-12 h-8 sm:h-12'>
                            <Image
                                fill
                                sizes='(min-width: 40rem) 3rem, 2rem'
                                referrerPolicy='no-referrer'
                                src={chatPartner.image}
                                alt={`${chatPartner.name} profile picture`}
                                className='rounded-full'
                            />
                        </div>
                    </div>

                    <div className='flex flex-col leading-tight'>
                        <div className='text-xl flex items-center'>
                            <span className='text-gray-700 mr-3 font-semibold'>
                                {chatPartner.name}
                            </span>
                        </div>
                        <span className='text-sm text-gray-600'>
                            {chatPartner.email}
                        </span>
                    </div>
                </div>
            </div>

            <Messages
                chatId={chatId}
                chatPartner={chatPartner}
                sessionImg={session.user.image}
                sessionUserId={session.user.id}
                initialMessages={initialMessages}
            />
            <ChatInput chatId={chatId} chatPartner={chatPartner} />
        </div>
    );
};

export default ChatPage;
