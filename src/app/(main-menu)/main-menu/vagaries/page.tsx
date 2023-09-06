import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

// components
import FullViewVagary from "@/components/vagaries/FullViewVagary";
import Board from "@/components/game/Board";

// data
import baseCards from "@/data/base-cards.json";

// lib
import { authOptions } from "@/lib/auth";

const RequestPage = async () => {
    const session = await getServerSession(authOptions);
    if (!session) notFound();

    const exampleVagary: InGameVagary = {
        ownedVagary: {
            id: "asdasda3r23r32",
            owner: {
                id: "asdasda3r23r32",
                name: "Lose One User",
                vagaries: [],
            },
            baseVagary: {
                id: 55,
                name: "Shashara: God of War and Coin",
                types: ["Yellow"],
                race: "Demon",
                timelineBranchesFrom: [],
                loreText:
                    "From the primal chaos of a nascent world, Shashara arose, embodying the fierce spirit of war and the relentless pursuit of wealth. Kingdoms bowed, either by the edge of the sword or the weight of gold, to his dual dominion. His temples, magnificent in gold and obsidian, stood as symbols of his unyielding power. Yet, whispers spoke of a prophecy, a reckoning where Shashara would face the culmination of his own deeds. As the world watches, an epic confrontation brews on the horizon.",
                timelineBecomesAvailableAtLevel: [],
                timelineBranchesTo: [],
                stamina: 3,
                baseHP: 120,
                basePower: 120,
                baseDefense: 120,
                baseSpeed: 60,
                moveMap: {
                    "1": 1,
                    "6": 21,
                    "10": 15,
                    "14": 16,
                    "29": 17,
                    "40": 18,
                    "46": 19,
                    "67": 22,
                    "69": 28,
                    "73": 29,
                    "81": 4,
                    "83": 8,
                },
                imgPath: "shashara/shashara-standard_128x128.png",
            },
            experience: 0,
            abilities: [],
        },
        currentHP: 200,
        currentPower: 200,
        currentDefense: 200,
        currentSpeed: 200,
        currentStamina: 200,
        position: [0, 0],
    };

    const initialTiles: Tile[][] = [
        [
            { x: 0, y: 0, vagary: exampleVagary },
            { x: 1, y: 0, vagary: null },
            { x: 2, y: 0, vagary: null },
        ],
        [
            { x: 0, y: 1, vagary: null },
            { x: 1, y: 1, vagary: null },
            { x: 2, y: 1, vagary: null },
        ],
        [
            { x: 0, y: 2, vagary: null },
            { x: 1, y: 2, vagary: null },
            { x: 2, y: 2, vagary: null },
        ],
    ];

    return (
        <main className='flex h-full flex-1 flex-col gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'>
            <h1 className='font-bold text-5xl mb-8'>All Vagaries</h1>
            <Board initialTiles={initialTiles} />
            <ul className='flex gap-3 flex-wrap'>
                {baseCards.map((card: any) => (
                    <li key={`card--${card.id}--${card.name}`}>
                        <FullViewVagary data={card as Vagary} />
                    </li>
                ))}
            </ul>
        </main>
    );
};

export default RequestPage;
