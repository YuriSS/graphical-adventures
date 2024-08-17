import { LogBuilder } from "../../infra/log/index.mjs";
import { StateProps } from "./state-props.mjs";

export class State {
  #logBuilder = new LogBuilder();
  #theme; #screen;

  #ctx; #canvas;

  constructor(canvasId, opts) {
    const { theme, screen } = new StateProps(opts).getOpts();
    this.#theme = theme;
    this.#screen = screen;

    const canvasResult = this.#canvasLoader(canvasId);
    this.#canvas = canvasResult.canvas;
    this.#ctx = canvasResult.ctx;

    this.#logBuilder.info("Canvas context loaded");
    this.#logBuilder.info("State initialized");
  }

  getTheme = () => this.#theme;
  getScreen = () => this.#screen;
  getCanvas = () => this.#canvas;
  ctx = () => this.#ctx;

  #canvasLoader(canvasId) {
    if (canvasId?.constructor !== String) {
      throw new Error(`[Canvas loader] Invalid canvas id type ${canvasId}`);
    }

    const canvas = document.getElementById(canvasId);

    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new Error(`[State] Invalid canvas id ${canvasId}`);
    }

    const ctx = canvas.getContext('2d');

    if (ctx?.constructor !== CanvasRenderingContext2D) {
      throw new Error(`[State] Invalid canvas context`);
    }

    return { canvas, ctx };
  }
}
