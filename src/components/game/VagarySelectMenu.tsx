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
    if (!selectedTile.vagary) return null;

    const { hemisphereNS, hemisphereEW } = getTileHemispheres(
        BOARD_DIM.height,
        BOARD_DIM.width,
        selectedTile
    );

    const hasStamina: boolean = selectedTile.vagary?.currentStamina > 0;

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

    function buttonClass(disabled: boolean): string {
        return `w-full font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-green-300 text-white
        ${
            disabled
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-900"
        }`;
    }

    return (
        <div
            className='z-50 absolute bg-green-800 opacity-90 shadow-lg p-4'
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
                        className={buttonClass(!hasStamina)}
                        onClick={onMoveClick}
                        disabled={!hasStamina}
                    >
                        Move
                    </button>
                </li>
                <li>
                    <button
                        className={buttonClass(!hasStamina)}
                        onClick={onAbilitiesClick}
                        disabled={!hasStamina}
                    >
                        Abilities
                    </button>
                </li>
                <li>
                    <button
                        className={buttonClass(false)}
                        onClick={onStatsClick}
                    >
                        Stats
                    </button>
                </li>
                <li>
                    <button
                        className={buttonClass(false)}
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
