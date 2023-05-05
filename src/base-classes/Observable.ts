// Define a type for the event data
export type EventData = any;

// Define a class for the Observable
export default class Observable<T = EventData> {
  private observers: Observer<T>[] = [];

  // Define a method for attaching observers
  attach(observer: Observer<T>): void {
    this.observers.push(observer);
  }

  // Define a method for detaching observers
  detach(observer: Observer<T>): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  // Define a method for notifying observers
  notify(eventData: T): void {
    this.observers.forEach(observer => {
      observer.update(eventData);
    });
  }
}

// Define an interface for the observer
export interface Observer<T> {
  update(eventData: T): void;
}
