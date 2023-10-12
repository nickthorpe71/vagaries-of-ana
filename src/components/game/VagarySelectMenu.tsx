import { FC } from "react";

// lib
import { BOARD_DIM, TILE_DIM } from "@/lib/const";

// modules
import { getTileHemispheres } from "@/modules/board";
import { calculateCurrentLevel } from "@/modules/vagary";

interface VagarySelectMenuProps {
    selectedTile: Tile;
    onMoveClick: () => void;
    onAbilitiesClick: () => void;
    onStatsClick: () => void;
    onCancelClick: () => void;
}

const VagarySelectMenu: FC<VagarySelectMenuProps> = ({
    selectedTile,
    onMoveClick,
    onAbilitiesClick,
    onStatsClick,
    onCancelClick,
}) => {
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

    console.log(selectedTile);

    return (
        <div
            className='z-50 absolute bg-green-800 opacity-90 border-2 border-green-500 shadow-lg p-4'
            style={calculatePosition()}
        >
            <ul className='flex flex-col gap-2'>
                <li className='w-full text-white font-bold'>{`${selectedTile
                    .vagary?.ownedVagary.baseVagary
                    .name} - Lvl:${calculateCurrentLevel(
                    selectedTile.vagary?.ownedVagary.experience || 0
                )}`}</li>
                <li className='w-full text-white font-bold flex justify-between gap-8'>
                    <span>{`HP: ${selectedTile.vagary?.currentHP}/${selectedTile.vagary?.ownedVagary.baseVagary.baseHP}`}</span>
                    <span>{`Stamina: ${selectedTile.vagary?.currentStamina}/${selectedTile.vagary?.ownedVagary.baseVagary.stamina}`}</span>
                </li>
                <li>
                    <button
                        className='w-full bg-green-500 hover:bg-green-900 text-white font-bold py-2 px-4 rounded border-2 border-green-900 focus:outline-none focus:ring focus:border-green-300'
                        onClick={onMoveClick}
                    >
                        Move
                    </button>
                </li>
                <li>
                    <button
                        className='w-full bg-green-500 hover:bg-green-900 text-white font-bold py-2 px-4 rounded border-2 border-green-900 focus:outline-none focus:ring focus:border-green-300'
                        onClick={onAbilitiesClick}
                    >
                        Abilities
                    </button>
                </li>
                <li>
                    <button
                        className='w-full bg-green-500 hover:bg-green-900 text-white font-bold py-2 px-4 rounded border-2 border-green-900 focus:outline-none focus:ring focus:border-green-300'
                        onClick={onStatsClick}
                    >
                        Stats
                    </button>
                </li>
                <li>
                    <button
                        className='w-full bg-green-500 hover:bg-green-900 text-white font-bold py-2 px-4 rounded border-2 border-green-900 focus:outline-none focus:ring focus:border-green-300'
                        onClick={onCancelClick}
                    >
                        Cancel
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default VagarySelectMenu;
