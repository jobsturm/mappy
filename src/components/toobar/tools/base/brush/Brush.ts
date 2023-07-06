import { baseMap as map } from "@/api/generateMap";
import type { Observer } from "@/base-classes/Observable";
import type Hexagon from "@/components/hexagon-canvas/hexagon-classes/Hexagon";
import { HEX_DEFAULT_COLOR, type Point } from "@/components/hexagon-canvas/hexagon-classes/Hexagon";
import BrushColorInput from "./components/BrushColorInput.vue";
import BrushRadiusInput from "./components/BrushRadiusInput.vue";
import { markRaw } from 'vue';

interface BrushHexagon extends Point {
  color: string;
}
type Coordinates = Array<BrushHexagon>;
interface CoordinatesToPaint {
  resetCoordinates: Coordinates;
  coordinates: Coordinates;
}

function getColor(x: number, y: number) {
  if (!map[y] || !map[y][x]) return HEX_DEFAULT_COLOR;
  return map[y][x];
}
function getResetCoordinates(resetX: number, resetY: number) {
  return {
    x: resetX,
    y: resetY,
    color: getColor(resetX, resetY),
  }
}
function getCoordinatesToPaint(hexagon: Hexagon, color: string, brushRadius: number):Promise<CoordinatesToPaint> {
  const coordinates:Coordinates = []; 
  const resetCoordinates:Coordinates = []; 

  return new Promise((resolve) => {
    const { x, y } = hexagon.getMapCoordinates();
    const iterationStart = -brushRadius;

    coordinates.push({ x, y, color });

    for (let i = iterationStart; i <= brushRadius; i++) {
      for (let j = iterationStart; j <= brushRadius; j++) {
        coordinates.push({ x: x + j, y: y + i, color });
        // If the current hexagon is on an even column, check if it's on the top or bottom row of the brush
        if (hexagon.coordinates.column % 2 == 0) {
          // If it's on the top row of the brush and its horizontal position is outside the range of -1 to 1,
          // mark the hexagons in the rows above it as needing to be reset to their original color
          if ((i === iterationStart) && (j < -1 || j > 1)) {
            const resetRowCount = Math.floor(Math.abs(j) / 2);
            // Every 2 blocks we move from the center
            // we need to increase the rows we are resseting by 1 due to he nature of hexagons
            for (let resetRowI = 1; resetRowI <= resetRowCount; resetRowI++) {
              resetCoordinates.push(getResetCoordinates(x + j, (y + i) + resetRowI - 1));
            }
          }
          // If it's on the bottom row of the brush and its horizontal position is outside the range of -1 to 1,
          // mark the hexagons in the rows below it as needing to be reset to their original color
          if ((i === brushRadius) && j !== 0) {
            const resetRowCount = Math.ceil(Math.abs(j) / 2);
            for (let resetRowI = 1; resetRowI <= resetRowCount; resetRowI++) {
              resetCoordinates.push(getResetCoordinates(x + j, (y + i) - resetRowI + 1));
            }
          }
        // If the current hexagon is on an odd column, check if it's on the top or bottom row of the brush
        } else {
          // If it's on the top row of the brush and its horizontal position is not 0,
          // mark the hexagons in the rows above it as needing to be reset to their original color
          if ((i === iterationStart)&& j !== 0) {
            const resetRowCount = Math.ceil(Math.abs(j) / 2);
            for (let resetRowI = 1; resetRowI <= resetRowCount; resetRowI++) {
              resetCoordinates.push(getResetCoordinates(x + j, (y + i) + resetRowI - 1));
            }
          }
          // If it's on the bottom row of the brush and its horizontal position is outside the range of -1 to 1,
          // mark the hexagons in the rows below it as needing to be reset to their original color
          if ((i === brushRadius)  && (j < -1 || j > 1)) {
            const resetRowCount = Math.floor(Math.abs(j) / 2);
            for (let resetRowI = 1; resetRowI <= resetRowCount; resetRowI++) {
              resetCoordinates.push(getResetCoordinates(x + j, (y + i) - resetRowI + 1));
            }
          }
        }
      }
    }
    
    resolve({
      coordinates,
      resetCoordinates
    });
  });
}

export interface BrushConfigurables {
  color: { value: string, isPublic: boolean, inputComponent: typeof BrushColorInput };
  brushRadius: { value: number, isPublic: boolean, inputComponent: typeof BrushRadiusInput };
}

export default class BrushObserver implements Observer<Hexagon> {
  configurables: BrushConfigurables;

  constructor(color:string) {
    this.configurables = {
      color: { value: color, isPublic: true, inputComponent: markRaw(BrushColorInput) },
      brushRadius: { value: 8, isPublic: true, inputComponent: markRaw(BrushRadiusInput) },
    }
  }
  setConfigurable<K extends keyof BrushConfigurables>(key: K, value: BrushConfigurables[K]['value']) {
    this.configurables[key].value = value;
  }
  setColor(x: number, y: number, color: string) {
    map[y] = map[y] || [];
    map[y][x] = color;
  }
  async update(hexagon: Hexagon) {
    const { coordinates, resetCoordinates } = await getCoordinatesToPaint(
      hexagon,
      this.configurables.color.value,
      this.configurables.brushRadius.value,
    );

    coordinates.forEach(point => {
      this.setColor(point.x, point.y, point.color);
    });
    resetCoordinates.forEach(point => {
      this.setColor(point.x, point.y, point.color);
    });
  }
}
