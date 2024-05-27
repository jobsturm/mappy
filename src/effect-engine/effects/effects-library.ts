import { Effect } from "../EffectsEngine";
import { fantasyColors } from "./color-library";
import { fantasyBlues } from "./colors/fantasy-blues";
import { fantasyGreens } from "./colors/fantasy-greens";
import { fantasyOranges } from "./colors/fantasy-oranges";
import { fantasyPinks } from "./colors/fantasy-others";
import { fantasyPurples } from "./colors/fantasy-purples";
import { fantasyWhites } from "./colors/fantasy-whites";
import { fantasyYellows } from "./colors/fantasy-yellows";
import { createBlastEffect } from "./effect-helper-function";

export type EffectTagsEnvironment = 'environment' | 'weather' | 'bad weather' | 'water';
export type EffectTagsActivity = 'activity' | 'traveling';
export type EffectTagsSpells = 'spell' | 'damage' | 'healing';
export type EffectTags = EffectTagsEnvironment | EffectTagsSpells | EffectTagsActivity;

export interface EffectWithTag extends Effect {
    tag: EffectTags[] | string[],
}
export interface EffectsLibraryInterface {
    [effectName: string]: EffectWithTag;
}

export const effectsLibrary: EffectsLibraryInterface = {
    MagicMissile: { tag: ['spell', 'damage'], ...createBlastEffect("Magic Missile", fantasyPurples.OriginalMagicMissile, [128, 128, 255]) },
    EldritchBlast: { tag: ['spell', 'damage', 'warlock'], ...createBlastEffect("Eldritch Blast", fantasyPurples.CrystalVisionPurple, fantasyPurples.MoonflowerViolet) },
    NecroticBlast: { tag: ['spell', 'damage', 'necrotic'], ...createBlastEffect("Necrotic Blast", fantasyGreens.NecromancerNightGreen, fantasyGreens.EmeraldDreamGreen) },
    Fireball: {
        name: "Fireball",
        tag: ['spell', 'damage'],
        steps: [
            { colors: [255, 69, 0], brightness: 255, duration: 400, transition: 3, effect: { name: 'Solid' }},
            { colors: [255, 165, 0], brightness: 180, duration: 800, transition: 8, effect: { name: 'Phased' }},
            { colors: [0, 0, 0], duration: 0, transition: 12, effect: { name: 'Solid' }}
        ],
        loop: false
    },
    Lightning: {
        name: "Lightning",
        tag: ['environment', 'weather', 'bad weather'],
        steps: [
            { colors: [150, 190, 255], brightness: 255, duration: 200, transition: 0 },
            { colors: [0, 0, 0], duration: 100 + Math.random() * 100, transition: 0 },
            { colors: [150, 190, 255], brightness: 255, duration: 50, transition: 0 },
            { colors: [0, 0, 0], duration: 40, transition: 0 },
            { colors: [0, 0, 0], duration: 2000, transition: 0 }
        ],
        loop: true
    },
    HealingWord: {
        name: "Healing Word",
        tag: ['spell', 'healing'],
        steps: [
            { 
                colors: [0, 255, 127],
                brightness: 255,
                duration: 600,
                transition: 5,
                effect: {
                    name: 'Fairy',
                },
            },
            { colors: [0, 255, 127], brightness: 0, duration: 150, transition: 15},
        ],
        loop: false
    },
    Sea: {
        name: "Sea",
        tag: ['environment', 'activity', 'water'],
        steps: [
            { colors: fantasyColors.fantasyTeals.DragonScaleTeal, brightness: 200, duration: 3000, transition: 30, effect: {name: 'Phased'} },
            { colors: fantasyColors.fantasyTeals.MysticSpringTeal, brightness: 180, duration: 3000, transition: 30 },
            { colors: fantasyBlues.DeepSeaExplorerBlue, brightness: 200, duration: 3000, transition: 30 },
            { colors: fantasyColors.fantasyAquas.CrystalWaterAqua, brightness: 180, duration: 3000, transition: 30 }
        ],
        loop: true
    },
    SeaStorm: {
        name: "Sea storm",
        tag: ['environment', 'activity', 'water', 'bad weather', 'danger'],
        steps: [
            { colors: fantasyBlues.DeepSeaExplorerBlue, brightness: 30, duration: 1000, transition: 30, effect: {name: 'Phased'} },
            { colors: fantasyBlues.DeepSeaExplorerBlue, brightness: 30, duration: 1000, transition: 30 },
            { colors: [0, 0, 0], duration: 10, transition: 0 },
            { colors: [150, 190, 255], brightness: 255, duration: 200, transition: 0 },
            { colors: [0, 0, 0], duration: 50, transition: 0 },
            { colors: [150, 190, 255], brightness: 255, duration: 50, transition: 0 },
            { colors: [0, 0, 0], duration: 50, transition: 0 },
            { colors: [150, 190, 255], brightness: 255, duration: 50, transition: 0 },
            { colors: fantasyBlues.DeepSeaExplorerBlue, brightness: 30, duration: 1000, transition: 0 },
            { colors: fantasyBlues.DeepSeaExplorerBlue, brightness: 30, duration: 1000, transition: 30 }
        ],
        loop: true
    },
    "Warm Light": {
        name: "Warm Light",
        tag: ['environment', 'cozy'],
        steps: [
            { 
                colors: fantasyOranges.AmberSunsetOrange,
                brightness: 240,
                duration: 500,
                transition: 5,
                effect: { 
                    name: 'Candle Multi',
                    additionalParams: {
                        c1: fantasyOranges.AmberSunsetOrange as [number, number, number],
                        c2: fantasyYellows.SunfireGold as [number, number, number],
                        c3: fantasyOranges.AmberSunsetOrange as [number, number, number],
                    }
                }},
            { colors: fantasyOranges.AmberSunsetOrange, brightness: 255, duration: 500, transition: 5, effect: { name: 'Candle Multi' }},
            { colors: fantasyOranges.AmberSunsetOrange, brightness: 200, duration: 500, transition: 4, effect: { name: 'Candle Multi' }},
            { colors: fantasyOranges.AmberSunsetOrange, brightness: 240, duration: 500, transition: 2, effect: { name: 'Candle Multi' }},
        ],
        loop: true
    },
    "Sunrise Begin": {
        name: "Sunrise Begin",
        tag: ['environment', 'dawn'],
        steps: [
            { colors: fantasyPinks.TwilightPink, brightness: 80, duration: 2000, transition: 20, effect: { name: 'Sunrise' }},
            { colors: fantasyOranges.AmberSunsetOrange, brightness: 100, duration: 2000, transition: 20, effect: { name: 'Sunrise' }},
        ],
        loop: false
    },
    "Sunrise Midway": {
        name: "Sunrise Midway",
        tag: ['environment', 'dawn'],
        steps: [
            { colors: fantasyPinks.RosePetalPink, brightness: 160, duration: 5000, transition: 50, effect: { name: 'Sunrise' }},
            { colors: fantasyYellows.GoldenTreasure, brightness: 180, duration: 5000, transition: 50, effect: { name: 'Sunrise' }},
            { colors: fantasyOranges.EmberOrange, brightness: 200, duration: 5000, transition: 50, effect: { name: 'Sunrise' }},
        ],
        loop: false
    },
    "Sunrise Almost Complete": {
        name: "Sunrise Almost Complete",
        tag: ['environment', 'morning'],
        steps: [
            { colors: fantasyYellows.SunfireGold, brightness: 220, duration: 5000, transition: 50, effect: { name: 'Sunrise' }},
            { colors: fantasyWhites.EnchantmentWhite, brightness: 240, duration: 5000, transition: 50, effect: { name: 'Sunrise' }},
            { colors: fantasyOranges.PumpkinSpiceOrange, brightness: 255, duration: 5000, transition: 50, effect: { name: 'Sunrise' }},
        ],
        loop: false
    },
    "Brisk Caribbean Day": {
        name: "Brisk Caribbean Day",
        tag: ['environment', 'sunrise'],
        steps: [
            { colors: [255, 189, 107], brightness: 255, duration: 4000, transition: 10, effect: { name: 'Solid' }}, // Step 1
        ],
        loop: false
    }
};
