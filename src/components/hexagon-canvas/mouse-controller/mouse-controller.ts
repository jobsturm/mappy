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
  mouseDown: boolean;
  mouseLocation: Point | null;
  
  constructor(canvas: HTMLCanvasElement, hexagonGrid: HexagonGrid) {
    this.canvas = canvas;
    this.hexagonGrid = hexagonGrid;
    this.oldHex = null;
    this.activeHex = null;
    this.mouseDown = false;
    this.mouseLocation = null;
    this.setMouseMoveHandling();
    this.setMouseClick();
    this.setMouseDown();
    this.setMouseUp();
    this.setMouseOut();
  }

  onMouseMove():void {
    if (!this.mouseLocation) return;
    this.activeHex = findHexagonContainingPoint(this.hexagonGrid.hexagons, { x: this.mouseLocation.x, y: this.mouseLocation.y })
    if (this.activeHex) {
      if (this.oldHex !== this.activeHex) {
        this.activeHex.handleMouseIn();
        if (this.mouseDown) this.activeHex.handleMouseClickedIn();
      }
      if (this.oldHex && this.oldHex !== this.activeHex) {
        this.oldHex.handleMouseOut();
        if (this.mouseDown) this.activeHex.handleMouseClickedOut();
      }
      this.oldHex = this.activeHex;
    }
  }

  setMouseMoveHandling():void {
    this.canvas.addEventListener('mousemove', (event: MouseEvent) => {
      this.mouseLocation = { x: event.x, y: event.y };
      this.onMouseMove();
    });
  }

  setMouseClick():void {
    this.canvas.addEventListener('click', () => {
      if (this.activeHex) {
        this.activeHex.handleClick();
      }
    })
  }
  setMouseDown():void {
    this.canvas.addEventListener('mousedown', () => {
      this.mouseDown = true;
      if (this.activeHex) {
        this.activeHex.handleMouseDown();
      }
    })
  }
  setMouseUp():void {
    this.canvas.addEventListener('mouseup', () => {
      this.mouseDown = false;
      if (this.activeHex) {
        this.activeHex.handleMouseUp();
      }
    })
  }
  // When the mouse leaves the canvas we want to stop all mousedown dragging effects.
  setMouseOut():void {
    this.canvas.addEventListener("mouseout", () => {
      this.mouseDown = false;
      this.mouseLocation = null;
      if (this.activeHex) {
        this.activeHex.handleMouseUp();
      }
    });
  }
}