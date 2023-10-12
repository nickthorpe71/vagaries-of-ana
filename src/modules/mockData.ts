import { v4 as uuidv4 } from "uuid";

// data
import baseCards from "@/data/base-cards.json";
import abilities from "@/data/abilities.json";

// modules
import { randInt, range } from "./number";

export function createMockPlayer(): Player {
    return {
        id: uuidv4(),
        name: randomNameGenerator(),
        vagaries: [],
    };
}

export function createMockAbility(): Ability {
    return abilities[randInt(0, abilities.length - 1)] as Ability;
}

export function createMockBaseVagary(): Vagary {
    return baseCards[randInt(0, baseCards.length - 1)] as Vagary;
}

export function createMockOwnedVagary(
    owner?: Player,
    baseVagary?: Vagary,
    experience?: number,
    abilities?: Ability[]
): OwnedVagary {
    return {
        id: uuidv4(),
        owner: owner || createMockPlayer(),
        baseVagary: baseVagary || createMockBaseVagary(),
        experience: experience || randInt(0, 100),
        abilities: abilities || range(randInt(1, 4)).map(createMockAbility),
    };
}

export function createMockInGameVagary(owner: Player): InGameVagary {
    const ownedVagary = owner
        ? createMockOwnedVagary(owner)
        : createMockOwnedVagary();
    return {
        ownedVagary: createMockOwnedVagary(),
        currentHP: ownedVagary.baseVagary.baseHP,
        currentPower: ownedVagary.baseVagary.basePower,
        currentDefense: ownedVagary.baseVagary.baseDefense,
        currentSpeed: ownedVagary.baseVagary.baseSpeed,
        currentStamina: ownedVagary.baseVagary.stamina,
    };
}

export function randomNameGenerator(): string {
    const prefixes = [
        "Mal",
        "Vor",
        "Necro",
        "Grim",
        "Bal",
        "Mor",
        "Hel",
        "Thorn",
        "Raven",
        "Shadow",
        "Terror",
        "Frost",
        "Blaze",
        "Night",
        "Abyss",
        "Dread",
        "Flame",
        "Storm",
        "Void",
        "Sorrow",
        "Venom",
        "Vile",
        "Wrath",
        "Fury",
        "Dark",
        "Brutal",
        "Cruel",
        "Savage",
        "Wild",
        "Ruthless",
        "Fear",
        "Pain",
        "Torment",
        "Agony",
        "Rage",
        "Anguish",
        "Torture",
        "Despair",
        "Death",
        "Doom",
        "Blight",
        "Plague",
        "Suffer",
        "Curse",
        "Grief",
        "Hatred",
        "Misery",
        "Woe",
        "Bane",
        "Lament",
        "Cataclysm",
        "Calamity",
        "Chaos",
        "Anarchy",
        "Destruction",
        "Carnage",
        "Disaster",
        "Havoc",
        "Ruin",
        "Vengeance",
        "Apocalypse",
        "Armageddon",
        "Desolation",
        "Devastation",
        "Annihilation",
        "Obliteration",
        "Damnation",
        "Perdition",
        "Reckoning",
        "Retribution",
        "Malefic",
        "Sinister",
        "Vicious",
        "Wicked",
        "Vile",
        "Vulgar",
        "Barbaric",
        "Ghastly",
        "Gloomy",
        "Grave",
        "Aldrich",
        "Artorias",
        "Izalith",
        "Oolacile",
        "Farron",
        "Gwyndolin",
        "Gwyn",
        "Gael",
        "Yhorm",
        "Lothric",
        "X9-",
        "R2-",
        "QT-",
        "B-33",
        "RX-",
        "VX-",
        "Z8-",
        "N7-",
        "G-59",
        "D3-",
        "Spike",
        "Vicious",
        "Jet",
        "Faye",
        "Ein",
        "Julia",
        "Gren",
        "Lin",
        "Shin",
        "Ed",
        "Deuce",
        "Bich",
        "Lirik",
        "Summit",
        "Myth",
        "Hysteria",
        "Duck",
        "Just",
    ];

    const middleParts = [
        "za",
        "mi",
        "tar",
        "thon",
        "kil",
        "bal",
        "rak",
        "mak",
        "til",
        "vorn",
        "zon",
        "xar",
        "xis",
        "ven",
        "vor",
        "vit",
        "vix",
        "zek",
        "zor",
        "zul",
        "zan",
        "zir",
        "zun",
        "zar",
        "zak",
        "xor",
        "xen",
        "xil",
        "xur",
        "xan",
        "kin",
        "kon",
        "kun",
        "kur",
        "kum",
        "ken",
        "kar",
        "kam",
        "kol",
        "kal",
        "rin",
        "ron",
        "run",
        "ras",
        "ram",
        "rex",
        "rig",
        "rik",
        "ril",
        "rap",
        "sin",
        "son",
        "sun",
        "sur",
        "sum",
        "sul",
        "sor",
        "sol",
        "sox",
        "sok",
        "tin",
        "ton",
        "tun",
        "tur",
        "tum",
        "tul",
        "tor",
        "tol",
        "tox",
        "tok",
        "win",
        "won",
        "wun",
        "wur",
        "wum",
        "wul",
        "wor",
        "wol",
        "wox",
        "wok",
        "yin",
        "yon",
        "yun",
        "yur",
        "yum",
        "yul",
        "yor",
        "yol",
        "yox",
        "yok",
        "zin",
        "zon",
        "zun",
        "zur",
        "zum",
        "zul",
        "zor",
        "zol",
        "zox",
        "zok",
        "egeta",
        "-soul",
        "-bone",
        "-fire",
        "-ash",
        "-hollow",
        "-abyss",
        "-sin",
        "-curse",
        "-bane",
        "-storm",
        "102",
        "501",
        "606",
        "707",
        "808",
        "909",
        "404",
        "303",
        "202",
        "101",
        "-bebop",
        "-syndicate",
        "-space",
        "-star",
        "-moon",
        "-sun",
        "-jazz",
        "-blues",
        "-rock",
        "-funk",
        "-TV",
        "-zone",
        "-land",
    ];

    const suffixes = [
        "dor",
        "morn",
        "tor",
        "gon",
        "dun",
        "cor",
        "thon",
        "lod",
        "mur",
        "fur",
        "nor",
        "zer",
        "xor",
        "xer",
        "con",
        "pan",
        "pon",
        "pox",
        "ken",
        "kox",
        "len",
        "lon",
        "lun",
        "lux",
        "ren",
        "ron",
        "run",
        "rax",
        "san",
        "son",
        "ton",
        "tun",
        "tux",
        "van",
        "von",
        "vun",
        "vax",
        "wan",
        "won",
        "wun",
        "xan",
        "xon",
        "xun",
        "xen",
        "yan",
        "yon",
        "yun",
        "yen",
        "zan",
        "zon",
        "aer",
        "air",
        "aur",
        "ear",
        "ior",
        "oor",
        "our",
        "irr",
        "orr",
        "urr",
        "ast",
        "est",
        "ist",
        "ost",
        "ust",
        "ort",
        "urt",
        "art",
        "ert",
        "irt",
        "ald",
        "eld",
        "ild",
        "old",
        "uld",
        "ard",
        "erd",
        "ird",
        "ord",
        "urd",
        "and",
        "end",
        "ind",
        "ond",
        "und",
        "ant",
        "ent",
        "int",
        "ont",
        "unt",
        "ath",
        "eth",
        "ith",
        "oth",
        "uth",
        "ach",
        "ech",
        "ich",
        "och",
        "uch",
        "hunter",
        "knight",
        "lord",
        "king",
        "queen",
        "saint",
        "sinner",
        "warrior",
        "priest",
        "mage",
        "2000",
        "3000",
        "4000",
        "5000",
        "6000",
        "7000",
        "8000",
        "9000",
        "10000",
        "11000",
        "valentine",
        "spiegel",
        "black",
        "red",
        "blue",
        "green",
        "yellow",
        "white",
        "purple",
        "orange",
        "killer",
        "slayer",
        "boss",
        "chief",
        "legend",
        "hero",
        "villain",
        "master",
        "elite",
        "pro",
    ];

    const rawName = range(randInt(1, 2))
        .map((i: number) => {
            while (true) {
                const type = i === 0 ? "first" : i === 1 ? "middle" : "last";
                const name = randomName(prefixes, middleParts, suffixes, type);
                if (
                    !isAllConsonants(name) &&
                    !name.endsWith("-") &&
                    !name.startsWith("-")
                ) {
                    return name;
                }
            }
        })
        .join(" ");

    const maxLength = 24;
    if (rawName.length > maxLength && rawName.includes(" ")) {
        return rawName
            .split(" ")
            .slice(0, rawName.length - 1)
            .join(" ");
    }

    return rawName;
}

function randomName(
    prefixes: string[],
    middleParts: string[],
    suffixes: string[],
    type: "first" | "middle" | "last" = "first"
): string {
    const maxLength = randInt(6, 15);

    const hasMiddlePart = randInt(0, 1) === 1;
    const hasSuffix = randInt(0, 1) === 1;

    const prefix =
        type === "first"
            ? prefixes[randInt(0, prefixes.length - 1)]
            : middleParts[randInt(0, prefixes.length - 1)];
    const middlePart = middleParts[randInt(0, middleParts.length - 1)];
    const suffix = suffixes[randInt(0, suffixes.length - 1)];

    const name = `${prefix}${hasMiddlePart ? middlePart : ""}${
        hasSuffix ? suffix : ""
    }`;

    // Capitalize all letters if they are following or preceded by numbers
    if (/[a-z]+\d+[a-z]+|\d+[a-z]+|[a-z]+\d+/i.test(name)) {
        return name.replace(
            /[a-z]+\d+[a-z]+|\d+[a-z]+|[a-z]+\d+/gi,
            (match: string) => {
                return match.toUpperCase();
            }
        );
    }

    return name[0].toUpperCase() + name.slice(1, maxLength);
}

function isAllConsonants(str: string): boolean {
    return /^[^aeiouy]+$/.test(str);
}
