import { FC, useState } from "react";

// utils
import { cn } from "@/lib/utils";

interface TileProps {
    tile: Tile;
    onClick: (tile: Tile) => void;
}

const Tile: FC<TileProps> = ({ tile, onClick }) => {
    const [isActive, setIsActive] = useState<boolean>(false);

    function getClassName(): string {
        return cn(
            "relative overflow-hidden flex items-center justify-center w-24 h-24 border border-green-500 bg-green-700 hover:bg-green-500 transition-all duration-100 transform",
            isActive
                ? `rounded bg-green-900 scale-105 bg-transparent animate-static`
                : ""
        );
    }

    return (
        <button
            style={{
                backgroundImage: isActive ? "url(/static-noise.png)" : "none",
                backgroundSize: "200% 200%",
                backgroundBlendMode: "multiply",
                transition: "opacity 300ms ease, background-color 300ms ease",
                zIndex: isActive ? 10 : 0,
                border: isActive ? "none" : undefined,
                opacity: isActive ? 0.6 : 1,
            }}
            key={`tile--${tile.x}-${tile.y}`}
            onClick={() => onClick(tile)}
            onMouseDown={() => setIsActive(true)}
            onMouseUp={() => setIsActive(false)}
            onMouseLeave={() => setIsActive(false)}
            className={getClassName()}
        >
            <span className='relative z-10'>
                {tile?.vagary?.ownedVagary.baseVagary.name || "\u00A0"}
            </span>
        </button>
    );
};

export default Tile;
