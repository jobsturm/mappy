import { Effect } from "../EffectsEngine";

export function createBlastEffect(name: string, primaryColor: number[], secondaryColor: number[]): Effect {
    return {
        name: name,
        steps: [
            { colors: primaryColor, brightness: 255, duration: 200, transition: 2 },
            { colors: secondaryColor, brightness: 180, duration: 400, transition: 2 },
            { colors: [0, 0, 0], duration: 300, transition: 2 }
        ],
        loop: false
    };
}
