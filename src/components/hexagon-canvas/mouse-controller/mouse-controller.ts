import type HexagonGrid from "../hexagon-classes/HexagonGrid";
import type { Point } from "../hexagon-classes/Hexagon";
import type Hexagon from "../hexagon-classes/Hexagon";

function isPointInsidePolygon(point: Point, polygon: Point[]): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;

    const intersect =
      ((yi > point.y) !== (yj > point.y)) &&
      (point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi);

    if (intersect) inside = !inside;
  }

  return inside;
}

function findHexagonContainingPoint(
  hexagons: Hexagon[],
  mouseCoordinates: Point
): Hexagon | null {
  for (const hexagon of hexagons) {
    if (isPointInsidePolygon(mouseCoordinates, hexagon.drawPoints)) {
      return hexagon;
    }
  }
  return null;
}

export default class MouseController {
  canvas: HTMLCanvasElement;
  hexagonGrid: HexagonGrid;
  oldHex:Hexagon | null = null;
  activeHex:Hexagon | null = null;
  
  constructor(canvas: HTMLCanvasElement, hexagonGrid: HexagonGrid) {
    this.canvas = canvas;
    this.hexagonGrid = hexagonGrid;
    this.oldHex = null;
    this.activeHex = null;
    this.setMouseMoveHandling();
    this.setMouseClick();
  }

  setMouseMoveHandling():void {
    this.canvas.addEventListener('mousemove', (event: MouseEvent) => {
      this.activeHex = findHexagonContainingPoint(this.hexagonGrid.hexagons, { x: event.x, y: event.y })
      if (this.activeHex) {
        if (this.oldHex !== this.activeHex) {
          this.activeHex.setHover();
        }
        if (this.oldHex && this.oldHex !== this.activeHex) {
          this.oldHex.removeHover();
        }
        this.oldHex = this.activeHex;
      }
    });
  }

  setMouseClick():void {
    this.canvas.addEventListener('click', () => {
      if (this.activeHex) {
        this.activeHex.handleClick();
      }
    })
  }
}