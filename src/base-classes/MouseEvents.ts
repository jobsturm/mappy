import Observable from './Observable';

export default class MouseEvents {
  mouseDown: boolean;
  mouseClickedIn: boolean;
  hover: boolean;
  mouseInObservable: Observable;
  mouseOutObservable: Observable;
  mouseDownObservable: Observable;
  mouseUpObservable: Observable;
  mouseClickedInObservable: Observable;
  mouseClickedOutObservable: Observable;
  mouseClickObservable: Observable;

  constructor() {
    this.mouseDown = false;
    this.mouseClickedIn = false;
    this.hover = false;

    this.mouseInObservable = new Observable();
    this.mouseOutObservable = new Observable();
    this.mouseDownObservable = new Observable();
    this.mouseUpObservable = new Observable();
    this.mouseClickedInObservable = new Observable();
    this.mouseClickedOutObservable = new Observable();
    this.mouseClickObservable = new Observable();
  }
  
  handleMouseIn() {
    this.hover = true;
    this.mouseInObservable.notify(this);
  }
  
  handleMouseOut() {
    this.hover = false;
    this.mouseOutObservable.notify(this);
  }
  
  handleMouseDown() {
    this.mouseDown = true;
    this.mouseDownObservable.notify(this);
  }
  
  handleMouseUp() {
    this.mouseDown = false;
    this.mouseUpObservable.notify(this);
  }
  
  handleMouseClickedIn() {
    this.mouseClickedIn = true;
    this.mouseClickedInObservable.notify(this);
  }
  
  handleMouseClickedOut() {
    this.mouseClickedIn = false;
    this.mouseClickedOutObservable.notify(this);
  }
  
  handleClick() {
    this.mouseClickObservable.notify(this);
    // const { x, y } = this.getMapCoordinates();
    // map[y] = map[y] || [];
    // map[y][x] = 'green';
  }
}
