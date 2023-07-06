export default class FpsCounter {
  private frames: number;
  private startTime: number;
  private lastTime: number;
  private fps: number;
  private fpsHistory: number[];
  private maxHistoryLength: number;

  constructor(maxHistoryLength: number = 60) {
    this.frames = 0;
    this.startTime = Date.now();
    this.lastTime = this.startTime;
    this.fps = 0;
    this.fpsHistory = [];
    this.maxHistoryLength = maxHistoryLength;
  }

  private updateFpsHistory(): void {
    this.fpsHistory.push(this.fps);

    if (this.fpsHistory.length > this.maxHistoryLength) {
      this.fpsHistory.shift();
    }
  }
  public countFrame(): void {
    this.frames++;
    const currentTime = Date.now();
    const elapsed = currentTime - this.lastTime;

    if (elapsed > 1000) {
      this.fps = this.frames;
      this.frames = 0;
      this.lastTime = currentTime;
      this.updateFpsHistory();
    }
  }

  public getFps(): number {
    return this.fps;
  }
  public getFpsHistory(): number[] {
    return this.fpsHistory;
  }
}
