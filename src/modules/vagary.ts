import { range } from "./array";
import { randInt } from "./number";

export function calculateCurrentLevel(exp: number): number {
    return Math.floor(Math.cbrt(exp));
}

export function calcExpToNextLevel(exp: number): number {
    const currentLevel = calculateCurrentLevel(exp);
    return Math.pow(currentLevel + 1, 3) - exp;
}

export function applyAbilityToVagary(
    caster: InGameVagary,
    target: InGameVagary,
    ability: Ability
): {
    logString: string;
    updatedTarget: InGameVagary;
} {
    // Get ability effect ranges
    const {
        health: healthRange,
        power: powerRange,
        defense: defenseRange,
        speed: speedRange,
        stamina: staminaRange,
        color: abilityColor,
    } = ability;

    // Calculate ability effect rolls
    const healthRoll = healthRange ? calcStatMod(healthRange) : 0;
    const powerRoll = powerRange ? calcStatMod(powerRange) : 0;
    const defenseRoll = defenseRange ? calcStatMod(defenseRange) : 0;
    const speedRoll = speedRange ? calcStatMod(speedRange) : 0;
    const staminaRoll = staminaRange ? calcStatMod(staminaRange) : 0;

    // Get caster stats
    const casterLevel = calculateCurrentLevel(caster.ownedVagary.experience);
    const { currentPower: casterPower } = caster;
    const casterTypes: Color[] = caster.ownedVagary.baseVagary.types.map(
        (type) => type.toLowerCase() as Color
    );

    // Get target stats
    const {
        currentHP: targetHP,
        currentPower: targetPower,
        currentDefense: targetDefense,
        currentSpeed: targetSpeed,
        currentStamina: targetStamina,
    } = target;
    const targetTypes: Color[] = target.ownedVagary.baseVagary.types.map(
        (type) => type.toLowerCase() as Color
    );

    // Calculate type modifiers
    const sameTypeAttackBonus: number = casterTypes.includes(
        abilityColor.toLowerCase() as Color
    )
        ? 1.5
        : 1;
    const typeEffectiveness: number = calcTypeEffectiveness(
        abilityColor.toLowerCase() as Color,
        targetTypes
    );

    // Calculate ability effect
    const targetHPEffect = calcAbilityEffect(
        casterLevel,
        healthRoll,
        targetDefense,
        casterPower,
        sameTypeAttackBonus,
        typeEffectiveness
    );
    const targetPowerEffect = calcAbilityEffect(
        casterLevel,
        powerRoll,
        targetDefense,
        casterPower,
        sameTypeAttackBonus,
        typeEffectiveness
    );
    const targetDefenseEffect = calcAbilityEffect(
        casterLevel,
        defenseRoll,
        targetDefense,
        casterPower,
        sameTypeAttackBonus,
        typeEffectiveness
    );
    const targetSpeedEffect = calcAbilityEffect(
        casterLevel,
        speedRoll,
        targetDefense,
        casterPower,
        sameTypeAttackBonus,
        typeEffectiveness
    );
    const targetStaminaEffect = calcAbilityEffect(
        casterLevel,
        staminaRoll,
        targetDefense,
        casterPower,
        sameTypeAttackBonus,
        typeEffectiveness
    );

    let logString = `${caster.ownedVagary.baseVagary.name} used ${ability.name}!`;

    if (targetHPEffect !== 0)
        logString += ` ${target.ownedVagary.baseVagary.name} ${
            targetHPEffect > 0 ? "gained" : "lost"
        } ${targetHPEffect} HP!`;
    if (targetPowerEffect !== 0)
        logString += ` ${target.ownedVagary.baseVagary.name} ${
            targetPowerEffect > 0 ? "gained" : "lost"
        } ${targetPowerEffect} Power!`;
    if (targetDefenseEffect !== 0)
        logString += ` ${target.ownedVagary.baseVagary.name} ${
            targetDefenseEffect > 0 ? "gained" : "lost"
        } ${targetDefenseEffect} Defense!`;
    if (targetSpeedEffect !== 0)
        logString += ` ${target.ownedVagary.baseVagary.name} ${
            targetSpeedEffect > 0 ? "gained" : "lost"
        } ${targetSpeedEffect} Speed!`;
    if (targetStaminaEffect !== 0)
        logString += ` ${target.ownedVagary.baseVagary.name} ${
            targetStaminaEffect > 0 ? "gained" : "lost"
        } ${targetStaminaEffect} Stamina!`;

    return {
        logString,
        updatedTarget: {
            ...target,
            currentHP: targetHP + targetHPEffect,
            currentPower: targetPower + targetPowerEffect,
            currentDefense: targetDefense + targetDefenseEffect,
            currentSpeed: targetSpeed + targetSpeedEffect,
            currentStamina: targetStamina + targetStaminaEffect,
        },
    };
}

function calcAbilityEffect(
    casterLevel: number,
    statRoll: number,
    targetDefense: number,
    casterPower: number,
    sameTypeAttackBonus: number,
    typeEffectiveness: number
): number {
    const directionMod: number = statRoll < 0 ? -1 : statRoll > 0 ? 1 : 0;
    const attackerBenefit: number = casterPower > targetDefense ? 1 : 0.5;
    const defenderBenefit: number = casterPower < targetDefense ? 1 : 0.5;
    return Math.floor(
        ((((2 * casterLevel) / 5 + 2) *
            (statRoll * 8) *
            ((casterPower * attackerBenefit) /
                (targetDefense * defenderBenefit))) /
            50) *
            sameTypeAttackBonus *
            typeEffectiveness +
            2 * directionMod
    );
}

function calcStatMod(statRange: number[]): number {
    const arr: number[] = statRange ? range(statRange[0], statRange[1]) : [0];
    return arr[randInt(0, arr.length - 1)];
}

export function calcTypeEffectiveness(
    abilityColor: Color,
    targetTypes: string[]
): number {
    const opposites: { [key: string]: Color } = {
        blue: "red",
        green: "yellow",
        black: "white",
        red: "blue",
        yellow: "green",
        white: "black",
    };

    const isSuperEffective = targetTypes.includes(opposites[abilityColor]);
    const isNotEffective = targetTypes.includes(abilityColor);

    return isSuperEffective ? 2 : isNotEffective ? 0.5 : 1;
}

export function scaleStatsToLevel(vagary: InGameVagary): InGameVagary {
    const { baseHP, basePower, baseDefense, baseSpeed, stamina } =
        vagary.ownedVagary.baseVagary;

    const currentLevel = calculateCurrentLevel(vagary.ownedVagary.experience);
    const modifier = currentLevel * 0.2;

    return {
        ...vagary,
        currentHP: Math.floor(baseHP * modifier),
        currentPower: Math.floor(basePower * modifier),
        currentDefense: Math.floor(baseDefense * modifier),
        currentSpeed: Math.floor(baseSpeed * modifier),
        currentStamina: Math.floor(stamina * modifier),
    };
}
