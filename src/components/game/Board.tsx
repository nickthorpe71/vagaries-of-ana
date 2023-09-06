"use client";

import React, { FC, useState, useRef } from "react";

interface BoardProps {
    initialTiles: Tile[][];
}

const Board: FC<BoardProps> = ({ initialTiles }) => {
    const [tiles, setTiles] = useState<Tile[][]>(initialTiles);
    const [draggingItem, setDraggingItem] = useState<InGameVagary | null>(null);
    const dragOverCell = useRef<{ row: number; col: number } | null>(null);

    const handleDragStart = (vagary: InGameVagary) => {
        setDraggingItem(vagary);
    };

    const handleDragOver = (row: number, col: number) => {
        dragOverCell.current = { row, col };

        if (draggingItem) {
            const newTiles = tiles.map((row) => row.slice()); // Clone the grid

            // Find and remove the dragging item from its current position
            for (let r = 0; r < initialTiles.length; r++) {
                for (let c = 0; c < initialTiles[r].length; c++) {
                    if (
                        newTiles[r][c] &&
                        newTiles[r][c]!.vagary?.ownedVagary.id ===
                            draggingItem.ownedVagary.id
                    ) {
                        newTiles[r][c].vagary = null;
                    }
                }
            }

            // Place the dragging item in the new position
            newTiles[row][col].vagary = draggingItem;

            setTiles(newTiles);
        }
    };

    const handleDragEnd = () => {
        setDraggingItem(null);
        dragOverCell.current = null;
    };

    const renderVagary = (tile: Tile, rowIndex: number, colIndex: number) => {
        return (
            <div
                key={`${rowIndex}-${colIndex}`}
                draggable={!!tile}
                onDragStart={() =>
                    tile && tile.vagary && handleDragStart(tile.vagary)
                }
                onDragOver={() => handleDragOver(rowIndex, colIndex)}
                onDragEnd={handleDragEnd}
                className={`p-4 rounded ${
                    tile ? "bg-blue-500 text-white cursor-move" : "bg-gray-200"
                }`}
            >
                {tile?.vagary?.ownedVagary.baseVagary.name}
            </div>
        );
    };

    return (
        <div
            className={`w-${initialTiles[0].length * 20} h-${
                initialTiles.length * 20
            } grid grid-cols-${initialTiles[0].length} gap-2 p-4`}
        >
            {tiles.map((row: Tile[], rowIndex: number) =>
                row.map((tile: Tile, colIndex: number) =>
                    renderVagary(tile, rowIndex, colIndex)
                )
            )}
        </div>
    );
};

export default Board;
