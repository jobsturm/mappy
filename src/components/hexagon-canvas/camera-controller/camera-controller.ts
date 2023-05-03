import type { Point } from "../hexagon-classes/Hexagon";
import type HexagonGrid from "../hexagon-classes/HexagonGrid";
import type { Dimensions } from "../hexagon-classes/HexagonGrid";

export default class CameraController {
  canvas: HTMLCanvasElement;
  hexagonGrid: HexagonGrid;
  dimensions: Dimensions;
  offset: Point;

  constructor(canvas: HTMLCanvasElement, hexagonGrid: HexagonGrid, dimensions: Dimensions) {
    this.canvas = canvas;
    this.hexagonGrid = hexagonGrid;
    this.dimensions = dimensions;
    this.offset = { x: 0, y: 0 };
    this.setEdgeScrollHandling();
    this.setScrollHandling();
    this.hexagonGrid.setRenderHook('cameraHook', () => {
      this.hexagonGrid.pan(this.offset);
    })
  }

  // When the user scrolls using a touchpad e.d.
  setScrollHandling():void {
    this.canvas.addEventListener('wheel', (event: WheelEvent) => {
      let { deltaX, deltaY } = event;
      if (event.deltaY >= -2 && event.deltaY <= 2) deltaY = 0;
      if (event.deltaX >= -2 && event.deltaX <= 2) deltaX = 0;
      this.offset = { x: deltaX / 200, y: deltaY / 200 };
    })
  }

  // When user hovers mouse over the edges of the page.
  setEdgeScrollHandling():void {
    this.canvas.addEventListener('mousemove', (event: MouseEvent) => {
      // Normal camera panning
      const halfWidth = this.dimensions.width / 2;
      const halfHeight = this.dimensions.height / 2;
      const x = (halfWidth - event.x);
      const y = (halfHeight - event.y);
      let ratioX = x / halfWidth;
      let ratioY = y / halfHeight;
      
      // Deadzone Checks
      const scrollBorderSize = 100;
      const deadzoneWidth = this.dimensions.width - (scrollBorderSize * 2);
      const deadzoneHeight = this.dimensions.height - (scrollBorderSize * 2);
      const halfDeadzoneWidth = deadzoneWidth / 2;
      const halfDeadzoneHeight = deadzoneHeight / 2;
      const left = halfWidth - halfDeadzoneWidth;
      const right = halfWidth + halfDeadzoneWidth;
      const top = halfHeight - halfDeadzoneHeight;
      const bottom = halfHeight + halfDeadzoneHeight;
      
      if (event.x > left && event.x < right && event.y > top && event.y < bottom) {
        ratioX = 0;
        ratioY = 0;
      }
  
      this.offset = { x: ratioX / 15, y: ratioY / 15 };
    });
  }
}