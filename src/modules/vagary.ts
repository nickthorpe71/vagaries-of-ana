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
): InGameVagary {
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
    const { currentPower: casterPower } = caster;
    const casterTypes: string[] = caster.ownedVagary.baseVagary.types;

    // Get target stats
    const {
        currentHP: targetHP,
        currentPower: targetPower,
        currentDefense: targetDefense,
        currentSpeed: targetSpeed,
        currentStamina: targetStamina,
    } = target;
    const targetTypes: string[] = target.ownedVagary.baseVagary.types;

    // Calculate type modifiers
    const sameTypeAttackBonus: number = casterTypes.includes(abilityColor)
        ? 1.5
        : 1;
    const typeEffectiveness: number = calcTypeEffectiveness(
        abilityColor.toLowerCase() as Color,
        targetTypes
    );

    // Calculate ability effect
    const targetHPEffect = calcAbilityEffect(
        healthRoll,
        targetDefense,
        casterPower,
        sameTypeAttackBonus,
        typeEffectiveness
    );
    const targetPowerEffect = calcAbilityEffect(
        powerRoll,
        targetDefense,
        casterPower,
        sameTypeAttackBonus,
        typeEffectiveness
    );
    const targetDefenseEffect = calcAbilityEffect(
        defenseRoll,
        targetDefense,
        casterPower,
        sameTypeAttackBonus,
        typeEffectiveness
    );
    const targetSpeedEffect = calcAbilityEffect(
        speedRoll,
        targetDefense,
        casterPower,
        sameTypeAttackBonus,
        typeEffectiveness
    );
    const targetStaminaEffect = calcAbilityEffect(
        staminaRoll,
        targetDefense,
        casterPower,
        sameTypeAttackBonus,
        typeEffectiveness
    );

    return {
        ...target,
        currentHP: targetHP + targetHPEffect,
        currentPower: targetPower + targetPowerEffect,
        currentDefense: targetDefense + targetDefenseEffect,
        currentSpeed: targetSpeed + targetSpeedEffect,
        currentStamina: targetStamina + targetStaminaEffect,
    };
}

function calcAbilityEffect(
    statRoll: number,
    targetDefense: number,
    casterPower: number,
    sameTypeAttackBonus: number,
    typeEffectiveness: number
): number {
    return Math.floor(
        ((statRoll * (casterPower / targetDefense)) / 50) *
            sameTypeAttackBonus *
            typeEffectiveness
    );
}

function calcStatMod(statRange: number[]): number {
    const arr: number[] = range ? range(statRange[0], statRange[1]) : [0];
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
