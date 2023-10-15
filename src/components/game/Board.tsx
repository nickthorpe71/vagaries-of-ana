"use client";

import React, { FC, useState } from "react";
import { cloneDeep } from "lodash";

// lib
import { BOARD_DIM } from "@/lib/const";

// enums
import { TileState } from "@/enums/game";

// modules
import { applyTileState } from "@/modules/board";
import { addVectors } from "@/modules/vector";
import { applyAbilityToVagary } from "@/modules/vagary";

// components
import Tile from "@/components/game/Tile";
import VagarySelectMenu from "./VagarySelectMenu";
import AbilitiesMenu from "./AbilitiesMenu";

interface BoardProps {
    initialTiles: Tile[][];
}

const Board: FC<BoardProps> = ({ initialTiles }) => {
    const [tiles, setTiles] = useState<Tile[][]>(initialTiles);
    const [selectedTile, setSelectedTile] = useState<Tile | null>(null);
    const [selectedAbility, setSelectedAbility] = useState<Ability | null>(
        null
    );
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [showAbilitiesMenu, setShowAbilitiesMenu] = useState<boolean>(false);
    const [battleLog, setBattleLog] = useState<string[]>([]);

    function onClickTile(tile: Tile) {
        const clickedTile = cloneDeep(tile);

        if (selectedTile) {
            // If currently selected tile is clicked again
            if (
                selectedTile.x === clickedTile.x &&
                selectedTile.y === clickedTile.y
            ) {
                clickedTile.state = applyTileState(
                    selectedTile.state,
                    TileState.DEFAULT
                );
                setSelectedTile(null);
                resetTileStates();
                return;
            }

            if (clickedTile.state === TileState.MOVEMENT) {
                moveVagary(selectedTile, clickedTile);
            } else if (
                clickedTile.state === TileState.ABILITY_TARGET &&
                selectedAbility
            ) {
                applyAbilityOnTile(selectedTile, clickedTile, selectedAbility);
            } else if (clickedTile.vagary) {
                setSelectedTile(clickedTile);
                resetTileStates();
                return;
            }
        } else if (clickedTile.vagary) {
            setSelectedTile(clickedTile);
            setShowMenu(true);
        }

        resetTileStates();
    }

    function moveVagary(currentTile: Tile, destination: Tile) {
        const newTiles = [...tiles];

        // calculate the amount of stamina used
        const distance = Math.abs(
            currentTile.x - destination.x + currentTile.y - destination.y
        );

        // subtract stamina from current tile
        const currentVagary = newTiles[currentTile.y][currentTile.x].vagary;
        if (currentVagary) {
            currentVagary.currentStamina -= distance;
        }

        // move vagary to destination
        newTiles[destination.y][destination.x].vagary = currentVagary;
        newTiles[currentTile.y][currentTile.x].vagary = null;

        setTiles(newTiles);
        setSelectedTile(null);
    }

    function handleMenuMoveClick() {
        if (!selectedTile || !selectedTile.vagary) return;
        const stamina: number = selectedTile.vagary.currentStamina;
        const { x, y } = selectedTile;
        const newTiles: Tile[][] = [...tiles];

        const directions = [
            { x: 0, y: -1, proceed: y > 0 },
            { x: 0, y: 1, proceed: y < BOARD_DIM.height - 1 },
            { x: -1, y: 0, proceed: x > 0 },
            { x: 1, y: 0, proceed: x < BOARD_DIM.width - 1 },
        ];

        for (let step = 1; step <= stamina; step++) {
            directions.forEach((direction) => {
                const newX = x + direction.x * step;
                const newY = y + direction.y * step;

                if (
                    direction.proceed &&
                    newX >= 0 &&
                    newX < BOARD_DIM.width &&
                    newY >= 0 &&
                    newY < BOARD_DIM.height &&
                    newTiles[newY][newX] &&
                    !newTiles[newY][newX].vagary
                ) {
                    newTiles[newY][newX].state = TileState.MOVEMENT;
                } else {
                    direction.proceed = false;
                }
            });
        }

        setTiles(newTiles);
        clearMenus();
    }

    function handleMenuAbilitiesClick() {
        clearMenus();
        setShowAbilitiesMenu(true);
    }

    function handleAbilitySelect(ability: Ability) {
        clearMenus();
        setSelectedAbility(ability);

        if (!selectedTile || !selectedTile.vagary) return;

        const castPositions: number[][] = ability.castPositions;

        const newTiles: Tile[][] = [...tiles];
        castPositions.forEach((position) => {
            const [x, y] = addVectors(position, [
                selectedTile.x,
                selectedTile.y,
            ]);
            if (newTiles[y] && newTiles[y][x]) {
                newTiles[y][x].state = TileState.ABILITY_TARGET;
            }
        });

        setTiles(newTiles);
    }

    function applyAbilityOnTile(caster: Tile, target: Tile, ability: Ability) {
        const newTiles = [...tiles];

        // Calculate the amount of stamina used
        const cost = ability.staminaCost;

        // Subtract stamina from current caster
        const casterVagary = cloneDeep(newTiles[caster.y][caster.x].vagary);
        if (casterVagary) {
            casterVagary.currentStamina -= cost;
            newTiles[caster.y][caster.x].vagary = casterVagary;
        }

        // Apply ability to target
        // TODO: need to apply the ability to all tiles in it's AoE not the clicked tile
        // also need to show card colors on each card
        const targetVagary = cloneDeep(newTiles[target.y][target.x].vagary);
        if (targetVagary && casterVagary) {
            const abilityRes = applyAbilityToVagary(
                casterVagary,
                targetVagary,
                ability
            );
            newTiles[target.y][target.x].vagary = abilityRes.updatedTarget;
            setBattleLog((prev) => [...prev, abilityRes.logString]);
        }

        setTiles(newTiles);
        setSelectedTile(null);
        setSelectedAbility(null);
    }

    function handleMenuStatsClick() {
        console.log("stats");
        clearMenus();
    }

    function handleMenuCancelClick() {
        setSelectedTile(null);
        clearMenus();
    }

    function resetTileStates() {
        const newTiles = [...tiles];
        newTiles.forEach((row) => {
            row.forEach((tile) => {
                tile.state = applyTileState(tile.state, TileState.DEFAULT);
            });
        });
        setTiles(newTiles);
    }

    function clearMenus() {
        setShowMenu(false);
        setShowAbilitiesMenu(false);
    }

    return (
        <div className='flex'>
            <div
                className={`flex flex-wrap relative md:w-board md:h-board w-boardMobile h-boardMobile`}
            >
                {tiles.map((row: Tile[], rowIndex: number) => (
                    <div
                        key={`board-row--${rowIndex}`}
                        className='flex w-full justify-center'
                    >
                        {row.map((tile: Tile) => (
                            <Tile
                                key={`tile--${tile.x}-${tile.y}`}
                                tile={tile}
                                isSelected={
                                    !!(
                                        selectedTile &&
                                        selectedTile.x === tile.x &&
                                        selectedTile.y === tile.y
                                    )
                                }
                                onClick={onClickTile}
                            />
                        ))}
                    </div>
                ))}
                {showMenu && selectedTile && selectedTile.vagary ? (
                    <VagarySelectMenu
                        selectedTile={selectedTile}
                        onMoveClick={handleMenuMoveClick}
                        onAbilitiesClick={handleMenuAbilitiesClick}
                        onStatsClick={handleMenuStatsClick}
                        onCancelClick={handleMenuCancelClick}
                    />
                ) : null}
                {showAbilitiesMenu && selectedTile && selectedTile.vagary ? (
                    <AbilitiesMenu
                        tile={selectedTile}
                        onBackClick={() => {
                            setShowAbilitiesMenu(false);
                            setShowMenu(true);
                        }}
                        onAbilityClick={handleAbilitySelect}
                    />
                ) : null}
            </div>
            <div className='flex flex-col justify-center w-24'>
                <ul className='list-disc list-inside'>
                    {battleLog.map((log, index) => (
                        <li key={`battle-log--${index}`}>
                            <p>{log}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Board;
