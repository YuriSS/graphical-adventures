import { LogBuilder, logScopeEnum } from "../infra/log.mjs";
import { Theme, themeEnum } from "./theme.mjs";
import { Screen } from "./screen.mjs";

export class State {
  #theme; #logBuilder; #screen; #ctx; #canvas;

  constructor(canvasId, theme) {
    this.#logBuilder = new LogBuilder();
    this.#screen = new Screen();

    this.#theme = themeLoader(theme, this.#logBuilder);
    this.log(logScopeEnum.INFO, `Theme ${this.#theme.getName()} initialized`);

    const canvasResult = canvasLoader(canvasId);
    this.#canvas = canvasResult.canvas;
    this.#ctx = canvasResult.ctx;

    this.log(logScopeEnum.INFO, `Canvas context loaded`);
    this.log(logScopeEnum.INFO, `State initialized`);
  }

  getTheme = () => this.#theme;
  getScreen = () => this.#screen;
  getCanvas = () => this.#canvas;
  ctx = () => this.#ctx;

  log = (...args) => this.#logBuilder.log(...args);
}

function themeLoader(theme, logApp) {
  if (logApp?.constructor !== LogBuilder) {
    throw new Error(`[Theme loader] Invalid log type ${logApp}`);
  }
  if (theme?.constructor !== Theme) {
    logApp.log(
      logScopeEnum.WARN,
      `Invalid theme ${theme}. Using default theme`
    );
    return themeEnum.DARK;
  }
  return theme;
}

function canvasLoader(canvasId) {
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
