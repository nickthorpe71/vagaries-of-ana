type Game = {
    id: string;
    players: Player[];
    board: Board;
    currentTurnPlayer: Player;
    vagaryTurnQueue: InGameVagary[];
    gameTime: number;
    turnSpeedTIme: number;
    gameStarted: boolean;
    gameEnded: boolean;
    winner: Player | null;
    loser: Player | null;
};

type Player = {
    id: string;
    name: string;
    type: "human" | "ai";
    vagaries: OwnedVagary[];
};

type Board = {
    tiles: Tile[][];
};

type Tile = {
    x: number;
    y: number;
    state: TileState;
    vagary: InGameVagary | null;
};

type InGameVagary = {
    ownedVagary: OwnedVagary;
    currentHP: number;
    currentPower: number;
    currentDefense: number;
    currentSpeed: number;
    currentStamina: number;
};

type OwnedVagary = {
    id: string;
    owner: Player;
    previousOwners: Array<{
        player: Player;
        acquiredDate: Date;
        releaseDate: Date;
    }>;
    baseVagary: Vagary;
    experience: number;
    abilities: Ability[];
};

type Vagary = {
    id: number;
    name: string;
    types: string[];
    race: string;
    timelineBranchesFrom: number[];
    loreText: string;
    timelineBecomesAvailableAtLevel: number[];
    timelineBranchesTo: number[];
    stamina: number;
    baseHP: number;
    basePower: number;
    baseDefense: number;
    baseSpeed: number;
    moveMap: Partial<Record<string, number>>;
    imgPath: string;
};

type Ability = {
    id: number;
    name: string;
    color: string;
    castPositions: [number, number][];
    aoe: [number, number][];
    hitAllInPath: boolean;
    staminaCost: number;
    health: [number, number] | null;
    power: [number, number] | null;
    defense: [number, number] | null;
    speed: [number, number] | null;
    stamina: [number, number] | null;
    tooltip: string;
    flavorText: string;
};

type Color = "blue" | "green" | "black" | "red" | "yellow" | "white";
