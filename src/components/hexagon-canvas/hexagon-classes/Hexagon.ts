import { baseMap as map } from '../../../api/generateMap';
import MouseEvents from '../../../base-classes/MouseEvents';

export const HEX_DIAMETER = 10;
export const HEX_DEFAULT_COLOR = '#0065C4';
export const HEX_LINE_WIDTH = 2;

export interface HexagonCoordinates {
  column: number
  row: number
};

export interface Point {
  x: number;
  y: number;
}

export default class Hexagon extends MouseEvents {
  readonly coordinates: HexagonCoordinates;
  readonly center: Point;
  baseCoordinates: Point;
  points: Point[];
  drawPoints: Point[];
  height: number;
  width: number;
  fillStyle: CanvasFillStrokeStyles['fillStyle'];
  strokeStyle: CanvasFillStrokeStyles['strokeStyle'];
  lineWidth: CanvasPathDrawingStyles['lineWidth'];

  constructor(hexagonCoordinates: HexagonCoordinates, offset: Point) {
    super();
    this.coordinates = hexagonCoordinates;
    this.width = 0;
    this.height = 0;

    // Styling
    this.fillStyle = HEX_DEFAULT_COLOR;
    this.strokeStyle = '#000000';
    this.lineWidth = HEX_LINE_WIDTH;

    this.center = this.getHexagonCenter(this.coordinates);
    this.baseCoordinates = { x: 0, y: 0 };
    this.points = this.getHexagonPoints(this.center);
    this.drawPoints = structuredClone(this.points);
    // we want to shift everything 1 to the left, so we can slide the whole grid
    this.shiftHexagonPoints(offset);

    // Pathing
    // this.path = new Path2D(this.getSvgPathFromPoints(this.drawPoints));
  }

  getHexagonCenter({ column, row }: HexagonCoordinates): Point {
    this.height = Math.sqrt(3) * HEX_DIAMETER;
    this.width = 2 * HEX_DIAMETER;
    const xOffset = column * this.width * 0.75;
    const yOffset = row * this.height + (column % 2) * this.height / 2;
  
    const center: Point = {
      x: HEX_DIAMETER + xOffset,
      y: this.height / 2 + yOffset
    };
  
    return center;
  }
  getHexagonPoints(center: Point): Point[] {
    const angles = [0, 60, 120, 180, 240, 300];
    const points: Point[] = [];
  
    for (let i = 0; i < 6; i++) {
      const angle = angles[i] * Math.PI / 180;
      const point: Point = {
        x: Math.round(center.x + HEX_DIAMETER * Math.cos(angle)),
        y: Math.round(center.y + HEX_DIAMETER * Math.sin(angle))
      };
      points.push(point);
    }
  
    return points;
  }
  shiftHexagonPoints(offset: Point) {
    // offset is 0 - 1 range.
    const offsetX = Math.round(offset.x * this.width);
    const offsetY = Math.round(offset.y * this.height);
    for (let i = 0; i < this.points.length; i++) {
      this.drawPoints[i].x = this.points[i].x + offsetX;
      this.drawPoints[i].y = this.points[i].y + offsetY;
    }
  }
  setBaseCoordinates(baseCoordinates: Point) {
    this.baseCoordinates = baseCoordinates;
    const mapRow = map[baseCoordinates.y + this.coordinates.row];
    if (!mapRow) { this.fillStyle = HEX_DEFAULT_COLOR; return }
    const mapColor = mapRow[baseCoordinates.x + this.coordinates.column] || HEX_DEFAULT_COLOR;
    this.fillStyle = mapColor;
  }
  getMapCoordinates():Point {
    const y = this.baseCoordinates.y + this.coordinates.row;
    const x = this.baseCoordinates.x + this.coordinates.column;
    return { x, y };
  }
  render(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = this.strokeStyle;  
    ctx.lineWidth = this.lineWidth;

    // Start a new path
    ctx.beginPath();

    // Move to the first point
    const x = this.drawPoints[0].x;
    const y = this.drawPoints[0].y;
    ctx.moveTo(x, y);

    // Iterate over the remaining points and draw lines
    for (let i = 1; i < this.drawPoints.length; i++) {
      const x = this.drawPoints[i].x;
      const y = this.drawPoints[i].y;
      ctx.lineTo(x, y);
    }

    // Close the path
    ctx.closePath();

    // Render the path
    if (this.fillStyle !== HEX_DEFAULT_COLOR) {
      ctx.stroke();
      ctx.fillStyle = this.fillStyle;
      ctx.fill();
    }
  }
}