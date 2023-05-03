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

  constructor(hexagonCoordinates: HexagonCoordinates, offset: Point) {
    this.coordinates = hexagonCoordinates;
    this.width = 0;
    this.height = 0;
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
  render(ctx: CanvasRenderingContext2D) {
    ctx.moveTo(this.drawPoints[0].x, this.drawPoints[0].y);
    this.drawPoints.forEach((point, i) => {
      ctx.lineTo(point.x, point.y);
    });
    ctx.lineTo(this.drawPoints[0].x, this.drawPoints[0].y);
    ctx.fillStyle = "green";
    ctx.fill();
  }
}