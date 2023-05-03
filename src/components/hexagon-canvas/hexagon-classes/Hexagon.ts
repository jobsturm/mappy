import { map } from '../../../api/generateMap';

export const HEX_DIAMETER = 60;

export interface HexagonCoordinates {
  column: number
  row: number
};

export interface Point {
  x: number;
  y: number;
}

export default class Hexagon {
  coordinates: HexagonCoordinates;
  center: Point;
  points: Point[];
  drawPoints: Point[];
  height: number;
  width: number;
  fillStyle: string;
  strokeStyle: string;
  lineWidth: number;

  constructor(hexagonCoordinates: HexagonCoordinates, offset: Point) {
    this.coordinates = hexagonCoordinates;
    this.width = 0;
    this.height = 0;

    this.fillStyle = 'white';
    this.strokeStyle = '#000000';
    this.lineWidth = 8;

    this.center = this.getHexagonCenter(this.coordinates);
    this.points = this.getHexagonPoints(this.center);
    this.drawPoints = structuredClone(this.points);
    // we want to shift everything 1 to the left, so we can slide the whole grid
    this.shiftHexagonPoints(offset);
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
    const offsetX = offset.x * this.width;
    const offsetY = offset.y * this.height;
    for (let i = 0; i < this.points.length; i++) {
      this.drawPoints[i].x = this.points[i].x + offsetX;
      this.drawPoints[i].y = this.points[i].y + offsetY;
    }
  }
  getSvgPathFromPoints(points:Point[]):string {
    const path = `M${points[0].x},${points[0].y} `
      + `L${points[1].x},${points[1].y} `
      + `L${points[2].x},${points[2].y} `
      + `L${points[3].x},${points[3].y} `
      + `L${points[4].x},${points[4].y} `
      + `L${points[5].x},${points[5].y} `
      + `Z`;
    return path;
  }
  setBaseCoordinates(baseCoordinates: Point) {
    const mapRow = map[baseCoordinates.y + this.coordinates.row];
    if (!mapRow) { this.fillStyle = 'white'; return }
    const mapColor = mapRow[baseCoordinates.x + this.coordinates.column] || 'white';
    this.fillStyle = mapColor;
  }
  setHover() {
    console.log('hover in');
    this.strokeStyle = '#FFF';
    this.lineWidth = 8;
  }
  removeHover() {
    console.log('hover out');
    this.strokeStyle = '#000';
    this.lineWidth = 8;
  }
  render(ctx: CanvasRenderingContext2D) {
    let p = new Path2D(this.getSvgPathFromPoints(this.drawPoints));
    ctx.strokeStyle = this.strokeStyle;  
    ctx.lineWidth = this.lineWidth;
    ctx.fillStyle = this.fillStyle;
    ctx.stroke(p);
    ctx.fill(p);
  }
}