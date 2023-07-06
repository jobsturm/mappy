import Observable from './Observable';

export type MouseEventObservables = {
  mouseInObservable: Observable;
  mouseOutObservable: Observable;
  mouseDownObservable: Observable;
  mouseUpObservable: Observable;
  mouseClickedInObservable: Observable;
  mouseClickedOutObservable: Observable;
  mouseClickObservable: Observable;
}

export default class MouseEvents {
  mouseDown: boolean;
  mouseClickedIn: boolean;
  hover: boolean;
  observables: MouseEventObservables;

  constructor() {
    this.mouseDown = false;
    this.mouseClickedIn = false;
    this.hover = false;

    this.observables = {
      mouseInObservable: new Observable(),
      mouseOutObservable: new Observable(),
      mouseDownObservable: new Observable(),
      mouseUpObservable: new Observable(),
      mouseClickedInObservable: new Observable(),
      mouseClickedOutObservable: new Observable(),
      mouseClickObservable: new Observable(),
    }
  }
  
  handleMouseIn() {
    this.hover = true;
    this.observables.mouseInObservable.notify(this);
  }
  
  handleMouseOut() {
    this.hover = false;
    this.observables.mouseOutObservable.notify(this);
  }
  
  handleMouseDown() {
    this.mouseDown = true;
    this.observables.mouseDownObservable.notify(this);
  }
  
  handleMouseUp() {
    this.mouseDown = false;
    this.observables.mouseUpObservable.notify(this);
  }
  
  handleMouseClickedIn() {
    this.mouseClickedIn = true;
    this.observables.mouseClickedInObservable.notify(this);
  }
  
  handleMouseClickedOut() {
    this.mouseClickedIn = false;
    this.observables.mouseClickedOutObservable.notify(this);
  }
  
  handleClick() {
    this.observables.mouseClickObservable.notify(this);
  }
}
