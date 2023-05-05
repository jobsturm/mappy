import Hexagon, { HEX_DIAMETER } from './Hexagon';
import type { Point } from './Hexagon';
import type { MouseEventObservables } from '@/base-classes/MouseEvents';
import type { EventData, Observer } from '@/base-classes/Observable';

export interface Dimensions {
  width: number,
  height: number,
}
export interface Grid {
  rows: number,
  columns: number,
}
type Hexagons = Hexagon[];

// To make it easier to controll the Observers of the hexagons
class GridNodesObservableController {
  hexagons: Hexagons;
  observerName: keyof MouseEventObservables;

  constructor(hexagons: Hexagons, observerName: keyof MouseEventObservables) {
    this.hexagons = hexagons;
    this.observerName = observerName;
  }

  attach(observer: Observer<EventData>) {
    this.hexagons.forEach(hexagon => {
      hexagon.observables[this.observerName].attach(observer);
    })
  }
  detach(observer: Observer<EventData>) {
    this.hexagons.forEach(hexagon => {
      hexagon.observables[this.observerName].detach(observer);
    })
  }
}

export type MassObservables = {
  [Property in keyof MouseEventObservables]: GridNodesObservableController
}

export default class HexagonGrid {
  dimensions: Dimensions;
  grid: Grid;
  hexagons: Hexagons;
  ctx: CanvasRenderingContext2D | null;
  offset: Point;
  coordinates: Point;
  renderHooks: { [key: string]: Function };
  gridNodeObservables: MassObservables;

  constructor(width: number, height: number) {
    this.dimensions = { width, height };
    this.ctx = null;
    this.offset = { x: -2, y: -2 };
    this.coordinates = { x: 0, y: 0 };
    this.grid = this.getHexagonGrid();
    this.hexagons = this.generateHexagons();
    this.renderHooks = {};
    this.gridNodeObservables = {
      mouseInObservable: new GridNodesObservableController(this.hexagons, 'mouseInObservable'),
      mouseOutObservable: new GridNodesObservableController(this.hexagons, 'mouseOutObservable'),
      mouseDownObservable: new GridNodesObservableController(this.hexagons, 'mouseDownObservable'),
      mouseUpObservable: new GridNodesObservableController(this.hexagons, 'mouseUpObservable'),
      mouseClickedInObservable: new GridNodesObservableController(this.hexagons, 'mouseClickedInObservable'),
      mouseClickedOutObservable: new GridNodesObservableController(this.hexagons, 'mouseClickedOutObservable'),
      mouseClickObservable: new GridNodesObservableController(this.hexagons, 'mouseClickObservable'),
    }
  }

  setCanvas(canvas: HTMLCanvasElement):void {
    this.ctx = canvas.getContext('2d');
    this.render();
  }
  setRenderHook(key: string, hook: Function) {
    this.renderHooks[key] = hook;
  }
  getHexagonGrid():Grid {
    const hexWidth = HEX_DIAMETER;
    const hexHeight = hexWidth * Math.sqrt(3) / 2;
    const numCols = 5 + Math.floor((this.dimensions.width / (hexWidth * 3/4)) / 2);
    const numRows = 4 + Math.floor((this.dimensions.height / hexHeight) / 2 );

    return { rows: numRows, columns: numCols };
  }
  generateHexagons():Hexagons {
    const hexagons = [];
    for (let i = 0; i <= this.grid.columns; i++) {
      for (let j = 0; j <= this.grid.rows; j++) {
        hexagons.push(new Hexagon({ column: i, row: j }, this.offset));
      }
    }
    console.log(hexagons[0]);
    return hexagons;
  }
  pan(offset: Point):void {
    this.offset.x += offset.x;
    this.offset.y += offset.y;
    if (this.offset.x > -1 || this.offset.x < -4) {
      if (this.offset.x > -1) this.coordinates.x -= 2;
      if (this.offset.x < -4) this.coordinates.x += 2;
      this.offset.x = -2.5;
    }
    if (this.offset.y > -1 || this.offset.y < -3) {
      if (this.offset.y > -1) this.coordinates.y -= 1;
      if (this.offset.y < -3) this.coordinates.y += 1;
      this.offset.y = -2;
    }
  }
  draw():void {
    const { ctx } = this;
    if (!ctx) return;
    this.hexagons.forEach(hexagon => {
      hexagon.shiftHexagonPoints(this.offset);
      hexagon.setBaseCoordinates(this.coordinates);
      hexagon.render(ctx);
    });
  }
  executeRenderHooks():void {
    Object.values(this.renderHooks).forEach(hook => hook());
  }
  render():void {
    const { ctx } = this;
    if (ctx) {
      ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
      this.executeRenderHooks();
      this.draw();
    }
    requestAnimationFrame(this.render.bind(this));
  }
}