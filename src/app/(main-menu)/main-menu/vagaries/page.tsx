import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

// components
import FullViewVagary from "@/components/vagaries/FullViewVagary";

// data
import baseCards from "@/data/base-cards.json";

// lib
import { authOptions } from "@/lib/auth";

const RequestPage = async () => {
    const session = await getServerSession(authOptions);
    if (!session) notFound();

    return (
        <main className='flex h-full flex-1 flex-col gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'>
            <h1 className='font-bold text-5xl mb-8'>All Vagaries</h1>
            <ul className='flex gap-3 flex-wrap'>
                {baseCards.map((card: Vagary) => (
                    <li>
                        <FullViewVagary data={card} />
                    </li>
                ))}
            </ul>
        </main>
    );
};

export default RequestPage;
