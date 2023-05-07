import { baseMap as map } from "@/api/generateMap";
import type { Observer } from "@/base-classes/Observable";
import type Hexagon from "@/components/hexagon-canvas/hexagon-classes/Hexagon";
import { HEX_DEFAULT_COLOR, type Point } from "@/components/hexagon-canvas/hexagon-classes/Hexagon";

interface BrushHexagon extends Point {
  color: string;
}

export default function(color:string): Observer<Hexagon>  {
  const brushObserver = {
    getColor(x: number, y: number) {
      if (!map[y] || !map[y][x]) return HEX_DEFAULT_COLOR;
      return map[y][x];
    },
    setColor(x: number, y: number, color: string) {
      map[y] = map[y] || [];
      map[y][x] = color;
    },
    update(hexagon: Hexagon) {
      const { x, y } = hexagon.getMapCoordinates();
      const brushSize = 4; // radius
      const coordinates:Array<BrushHexagon> = [];
      const resetCoordinates:Array<BrushHexagon> = [];
      const iterationStart = -brushSize;

      coordinates.push({ x, y, color });

      function setResetCoordinates(resetX: number, resetY: number) {
        resetCoordinates.push({
          x: resetX,
          y: resetY,
          color: brushObserver.getColor(resetX, resetY),
        })
      }

      for (let i = iterationStart; i <= brushSize; i++) {
        for (let j = iterationStart; j <= brushSize; j++) {
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
                setResetCoordinates(x + j, (y + i) + resetRowI - 1);
              }
            }
            // If it's on the bottom row of the brush and its horizontal position is outside the range of -1 to 1,
            // mark the hexagons in the rows below it as needing to be reset to their original color
            if ((i === brushSize) && j !== 0) {
              const resetRowCount = Math.ceil(Math.abs(j) / 2);
              for (let resetRowI = 1; resetRowI <= resetRowCount; resetRowI++) {
                setResetCoordinates(x + j, (y + i) - resetRowI + 1);
              }
            }
          // If the current hexagon is on an odd column, check if it's on the top or bottom row of the brush
          } else {
            // If it's on the top row of the brush and its horizontal position is not 0,
            // mark the hexagons in the rows above it as needing to be reset to their original color
            if ((i === iterationStart)&& j !== 0) {
              const resetRowCount = Math.ceil(Math.abs(j) / 2);
              for (let resetRowI = 1; resetRowI <= resetRowCount; resetRowI++) {
                setResetCoordinates(x + j, (y + i) + resetRowI - 1);
              }
            }
            // If it's on the bottom row of the brush and its horizontal position is outside the range of -1 to 1,
            // mark the hexagons in the rows below it as needing to be reset to their original color
            if ((i === brushSize)  && (j < -1 || j > 1)) {
              const resetRowCount = Math.floor(Math.abs(j) / 2);
              for (let resetRowI = 1; resetRowI <= resetRowCount; resetRowI++) {
                setResetCoordinates(x + j, (y + i) - resetRowI + 1);
              }
            }
          }
        }
        // Because of some race condition where this would start when the loop above wasn't finished.
        setTimeout(() => {
          coordinates.forEach(point => {
            brushObserver.setColor(point.x, point.y, point.color);
          });
          resetCoordinates.forEach(point => {
            brushObserver.setColor(point.x, point.y, point.color);
          });
        }, 1);
      }
    }
  }
  return brushObserver;
}
