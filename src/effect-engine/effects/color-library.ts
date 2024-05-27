import { fantasyBlues } from "./colors/fantasy-blues";
import { fantasyGreens } from "./colors/fantasy-greens";
import { fantasyOranges } from "./colors/fantasy-oranges";
import * as fantasyOthers from "./colors/fantasy-others";
import { fantasyPurples } from "./colors/fantasy-purples";
import { fantasyReds } from "./colors/fantasy-reds";
import { fantasyWhites } from "./colors/fantasy-whites";
import { fantasyYellows } from "./colors/fantasy-yellows";

export interface RGBColor {
    [key: string]: number[];
}
export interface FantasyColors {
    [category: string]: RGBColor;
}

export const fantasyColors: FantasyColors = {
    fantasyReds,
    fantasyGreens,
    fantasyBlues,
    fantasyWhites,
    fantasyPurples,
    Grays: {
        ShadowRealmBlack: [41, 36, 33],
        KrakenInkBlack: [36, 34, 52],
        StormcloudGrey: [112, 128, 144],
        GolemStoneGrey: [169, 169, 169]
    },
    fantasyYellows,
    fantasyOranges,
    ...fantasyOthers
};
