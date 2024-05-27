// TypeScript Type Definitions for WLED

import { WLEDEffectName } from "./wled-effects/WLEDEffects";

// Basic RGB Color type
export type RGB = [number, number, number]; // Represents [R, G, B]

// For setting individual LEDs or ranges
export type LEDIndexColor = [number, RGB]; // [LED Index, Color]
export type LEDRangeColor = [number, number, RGB]; // [Start Index, End Index, Color]

// For handling individual LED, ranges of LEDs, and multiple colors per segment
export type IndividualLEDSetting = {
    i: (number | RGB | string)[];
}

// Enhanced segment settings for effects
export type SegmentEffectSettings = {
    id: number;
    fx: number;          // Effect ID
    sx?: number;         // Speed of the effect
    ix?: number;         // Intensity of the effect
    pal?: number;        // Palette number
    col?: [RGB, RGB?, RGB?];  // Up to three color settings
    c1?: RGB;
    c2?: RGB;
    c3?: RGB;
};

// Segment brightness and other properties
export type SegmentControl = {
    id: number;
    bri?: number;        // Brightness
    on?: boolean;        // On/Off state
    transition?: number; // Transition time in milliseconds
    tt?: number;         // Transition time for one API call in milliseconds
};

// Combining all segment related settings
export type SegmentData = {
    tt?: number;         // Transition time for one API call in milliseconds
    seg: (SegmentEffectSettings | SegmentControl | IndividualLEDSetting)[];
};

// WLED Effect interface based on the available effects
export interface WLEDEffectParams {
    speed?: number;
    intensity?: number;
    palette?: number;
    c1: RGB,
    c2: RGB,
    c3: RGB,
}

export interface WLEDEffectByName {
    name: WLEDEffectName;
    additionalParams?: WLEDEffectParams;
}

export interface WLEDEffect extends WLEDEffectByName {
    id: number;
}

