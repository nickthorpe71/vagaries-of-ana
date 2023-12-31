import { FC, useState } from "react";

// hooks
import useScreenSize from "@/hooks/useScreenSize";

// modules
import { calcPosFromHemispheres } from "@/modules/ui";

// components
import Button from "@/components/ui/Button";

interface AbilitiesMenuProps {
    tile: Tile;
    onBackClick: () => void;
    onAbilityClick: (ability: Ability) => void;
}
const AbilitiesMenu: FC<AbilitiesMenuProps> = ({
    tile,
    onBackClick,
    onAbilityClick,
}) => {
    const screenSize: ScreenSize = useScreenSize();
    const abilities = tile.vagary?.ownedVagary.abilities || [];
    const [hoveredAbility, setHoveredAbility] = useState<Ability | null>(null);

    return (
        <div
            className='z-50 absolute bg-slate-800 opacity-90 shadow-lg p-4'
            style={calcPosFromHemispheres(tile, screenSize)}
        >
            <ul className='flex flex-col gap-2'>
                <li>
                    <Button variant={"gameMenu"} onClick={onBackClick}>
                        {"<- Back"}
                    </Button>
                </li>
                {abilities.map((ability: Ability, index: number) => (
                    <li
                        key={`ability--${ability.name}-${index}${tile.x}${tile.y}`}
                    >
                        <Button
                            variant={"gameMenu"}
                            onClick={() => onAbilityClick(ability)}
                            onMouseEnter={() => setHoveredAbility(ability)}
                            onMouseLeave={() => setHoveredAbility(null)}
                        >
                            {ability.name}
                        </Button>
                        {hoveredAbility === ability && (
                            <div className='absolute bg-white p-2 shadow-lg'>
                                <h4>{ability.name}</h4>
                                <p>{ability.tooltip}</p>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AbilitiesMenu;
