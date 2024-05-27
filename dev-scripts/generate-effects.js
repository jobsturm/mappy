import axios from "axios";
import fs from 'fs';
const WLED_IP = '192.168.1.60';

async function getAllEffects() {
    try {
        const response = await axios.get(`http://${WLED_IP}/json/effects`);
        return response.data;
    } catch (error) {
        console.error('Error fetching effects from WLED:', error);
        return null;
    }
}

async function generateEffectsInterface() {
    const effects = await getAllEffects();
    if (!effects) return;

    let typeContent = 'export type WLEDEffectName = \n';
    let effectArray = `export const effects:Array<WLEDEffectName> = [`;
    effects.forEach((effect) => {
        effectArray += `'${effect}',`;
        typeContent += `  | '${effect}'\n`;
    });
    typeContent += ';\n';
    effectArray += ']';

    fs.writeFileSync('./src/wled-adapter/wled-effects/WLEDEffects.ts', `${typeContent} \n ${(effectArray)}`);
    console.log('Effects interface generated.');
}

generateEffectsInterface();
