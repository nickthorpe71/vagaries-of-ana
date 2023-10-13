import { FC } from "react";

// hooks
import useScreenSize from "@/hooks/useScreenSize";

// modules
import { calculateCurrentLevel } from "@/modules/vagary";
import { calcPosFromHemispheres } from "@/modules/ui";

// components
import Button from "@/components/ui/Button";

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
    const screenSize: ScreenSize = useScreenSize();
    const hasStamina: boolean = selectedTile.vagary?.currentStamina > 0;

    const statsClass =
        "w-full text-white text-sm md:text-base font-bold flex justify-between md:gap-8 gap:4";

    return (
        <div
            className='z-50 absolute bg-green-800 opacity-90 shadow-lg p-4'
            style={calcPosFromHemispheres(selectedTile, screenSize)}
        >
            <ul className='flex flex-col gap-2'>
                <li className={statsClass}>{`${selectedTile.vagary?.ownedVagary
                    .baseVagary.name} - Lvl:${calculateCurrentLevel(
                    selectedTile.vagary?.ownedVagary.experience || 0
                )}`}</li>
                <li className={statsClass}>
                    <span>{`HP: ${selectedTile.vagary?.currentHP}/${selectedTile.vagary?.ownedVagary.baseVagary.baseHP}`}</span>
                    <span>{`Stamina: ${selectedTile.vagary?.currentStamina}/${selectedTile.vagary?.ownedVagary.baseVagary.stamina}`}</span>
                </li>
                <li>
                    <Button
                        variant={"gameMenu"}
                        onClick={onMoveClick}
                        disabled={!hasStamina}
                    >
                        Move
                    </Button>
                </li>
                <li>
                    <Button
                        variant={"gameMenu"}
                        onClick={onAbilitiesClick}
                        disabled={!hasStamina}
                    >
                        Abilities
                    </Button>
                </li>
                <li>
                    <Button variant={"gameMenu"} onClick={onStatsClick}>
                        Stats
                    </Button>
                </li>
                <li>
                    <Button variant={"gameMenu"} onClick={onCancelClick}>
                        Cancel
                    </Button>
                </li>
            </ul>
        </div>
    );
};

export default VagarySelectMenu;
