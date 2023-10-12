import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

// components
import Board from "@/components/game/Board";

// enums
import { TileState } from "@/enums/game";

// modules
import { createMockInGameVagary, createMockPlayer } from "@/modules/mockData";

// lib
import { BOARD_DIM } from "@/lib/const";
import { authOptions } from "@/lib/auth";

const Demo = async () => {
    const session = await getServerSession(authOptions);
    if (!session) notFound();

    const mockPlayer1: Player = createMockPlayer();
    const mockPlayer2: Player = createMockPlayer();

    const initialTiles: Tile[][] = Array.from(
        { length: BOARD_DIM.height },
        (_, y) =>
            Array.from({ length: BOARD_DIM.width }, (_, x) => ({
                x: x,
                y: y,
                state: TileState.DEFAULT,
                vagary:
                    y === 0 && x % 2 === 0
                        ? createMockInGameVagary(mockPlayer1)
                        : y === 6 && x % 2 === 0
                        ? createMockInGameVagary(mockPlayer2)
                        : null,
            }))
    );

    return (
        <main className='flex h-full flex-1 flex-col gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'>
            <h1 className='font-bold text-5xl mb-8'>All Vagaries</h1>
            <h2>{mockPlayer1.name}</h2>
            <Board initialTiles={initialTiles} />
            <h2>{mockPlayer2.name}</h2>
        </main>
    );
};

export default Demo;
