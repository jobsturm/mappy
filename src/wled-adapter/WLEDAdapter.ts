import axios from 'axios';
import { getWLEDEffect } from './wled-effects/get-wled-effect';
import { IndividualLEDSetting, LEDIndexColor, LEDRangeColor, SegmentData, WLEDEffect, SegmentEffectSettings, WLEDEffectByName, RGB } from './wled.types';

class WLEDAdapter {
    private baseUrl: string;

    constructor(ip: string) {
        this.baseUrl = `http://${ip}/json`;
    }

    async sendRequest(data: object) {
        try {
            console.log('WLED REQUEST', data);
            const response = await axios.post(this.baseUrl, data);
            return response.data;
        } catch (error) {
            console.error('Error sending request to WLED:', error);
            return null;
        }
    }

    async resetLEDStrip() {
        // Create a data object that turns off all segments, then turns them back on
        // This approach uses the 'nightlight' function temporarily to ensure a soft reset
        const data = {
            on: false, // Turn off the strip
            nl: { on: true, dur: 1, mode: 1 }  // Nightlight mode to quickly turn it back on
        };

        // First turn off the strip
        await this.sendRequest(data);

        // Optionally, reset to a default color or turn back on if needed
        const resetData = {
            on: true, // Ensure the strip is turned back on
            seg: [{ col: [[0, 0, 0]] }]  // Set all LEDs to black, effectively clearing any residual colors
        };

        // Send the reset command
        return this.sendRequest(resetData);
    }

    async setColor(colorData: RGB | IndividualLEDSetting | (LEDIndexColor | LEDRangeColor)[], brightness?: number, segmentId = 0, transition = 0) {
        let data: SegmentData;
        if (Array.isArray(colorData) && colorData.length === 3 && typeof colorData[0] === 'number') {
            const fullColor: RGB = colorData as RGB;
            data = {
                tt: transition,
                seg: [{
                    id: segmentId,
                    col: [fullColor],
                    bri: brightness,
                }]
            };
        } else if ('i' in colorData) {
            data = { seg: [{ id: segmentId, ...colorData, transition }] };
        } else {
            const settings: IndividualLEDSetting = { i: [] };
            colorData.forEach(item => {
                if (Array.isArray(item) && item.length === 2) {
                    const indexColor = item as LEDIndexColor;
                    settings.i.push(indexColor[0], indexColor[1].join(''));
                } else if (Array.isArray(item) && item.length === 3) {
                    const rangeColor = item as LEDRangeColor;
                    settings.i.push(rangeColor[0], rangeColor[1], rangeColor[2].join(''));
                }
            });
            data = { seg: [{ id: segmentId, ...settings, transition }] };
        }
        return this.sendRequest(data);
    }

    async setEffect(effect: WLEDEffect, segmentId = 0) {
        const { id, additionalParams } = effect;
        const effectData: SegmentEffectSettings = {
            id: segmentId,
            fx: id,
            sx: additionalParams?.speed,
            ix: additionalParams?.intensity,
            pal: additionalParams?.palette || 2,
            c1: additionalParams?.c1,
            c2: additionalParams?.c2,
            c3: additionalParams?.c3,
        };
        const data: SegmentData = { seg: [effectData] };
        return this.sendRequest(data);
    }

    async setEffectByName(effectByName: WLEDEffectByName, segmentId = 0) {
        const id = getWLEDEffect(effectByName.name);
        this.setEffect({
            id,
            ...effectByName,
        }, segmentId);
    }
 
    async setBrightness(brightness: number, segmentId?: number) {
        const data = {
            seg: [{
                id: segmentId,
                bri: brightness
            }]
        };
        return this.sendRequest(segmentId !== undefined ? data : {bri: brightness});
    }

    async toggleOnOff(on: boolean, segmentId?: number) {
        const data = {
            seg: [{
                id: segmentId,
                on: on
            }]
        };
        return this.sendRequest(segmentId !== undefined ? data : {on: on});
    }

    async getState() {
        try {
            const response = await axios.get(`${this.baseUrl}/state`);
            return response.data;
        } catch (error) {
            console.error('Error getting state from WLED:', error);
            return null;
        }
    }

    async getAllEffects() {
        try {
            const response = await axios.get(`${this.baseUrl}/effects`);
            return response.data;
        } catch (error) {
            console.error('Error fetching effects from WLED:', error);
            return null;
        }
    }
}

export default WLEDAdapter;
