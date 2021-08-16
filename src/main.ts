import Render from "./render.js";

export class Boat {
  render(canvas: HTMLCanvasElement): void {
    new Render(canvas);
    console.log(canvas);
  }
}
