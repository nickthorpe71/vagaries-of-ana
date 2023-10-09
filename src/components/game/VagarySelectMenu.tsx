import { FC } from "react";

// lib
import { getTileHemispheres } from "@/modules/board";
import { BOARD_DIM, TILE_DIM } from "@/lib/const";

interface VagarySelectMenuProps {
    selectedTile: Tile;
}

const VagarySelectMenu: FC<VagarySelectMenuProps> = ({ selectedTile }) => {
    const { hemisphereNS, hemisphereEW } = getTileHemispheres(
        BOARD_DIM.height,
        BOARD_DIM.width,
        selectedTile
    );

    function calculatePosition(): {
        top: string | number;
        bottom: string | number;
        right: string | number;
        left: string | number;
    } {
        const top =
            hemisphereNS === "south"
                ? "auto"
                : selectedTile.y * TILE_DIM.height;
        const bottom =
            hemisphereNS === "north"
                ? "auto"
                : Math.abs(selectedTile.y + 1 - BOARD_DIM.height) *
                  TILE_DIM.height;
        const right =
            hemisphereEW === "west"
                ? "auto"
                : Math.abs(selectedTile.x - BOARD_DIM.width) * TILE_DIM.width;
        const left =
            hemisphereEW === "east"
                ? "auto"
                : (selectedTile.x + 1) * TILE_DIM.width;
        return {
            top,
            bottom,
            right,
            left,
        };
    }

    return (
        <div
            className='z-50 absolute bg-green-800 border-2 border-green-500 rounded-lg shadow-lg p-4'
            style={calculatePosition()}
        >
            <ul className='flex flex-col gap-2'>
                <li>
                    <button className='w-full bg-green-500 hover:bg-green-900 text-white font-bold py-2 px-4 rounded border-2 border-green-900 focus:outline-none focus:ring focus:border-green-300'>
                        Move
                    </button>
                </li>
                <li>
                    <button className='w-full bg-green-500 hover:bg-green-900 text-white font-bold py-2 px-4 rounded border-2 border-green-900 focus:outline-none focus:ring focus:border-green-300'>
                        Attack
                    </button>
                </li>
                <li>
                    <button className='w-full bg-green-500 hover:bg-green-900 text-white font-bold py-2 px-4 rounded border-2 border-green-900 focus:outline-none focus:ring focus:border-green-300'>
                        Stats
                    </button>
                </li>
                <li>
                    <button className='w-full bg-green-500 hover:bg-green-900 text-white font-bold py-2 px-4 rounded border-2 border-green-900 focus:outline-none focus:ring focus:border-green-300'>
                        Cancel
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default VagarySelectMenu;
