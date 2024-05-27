import { effects, WLEDEffectName } from "./WLEDEffects";

export function getWLEDEffect(effectName: WLEDEffectName):number {
    return effects.indexOf(effectName);
}