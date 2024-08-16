import { logScopeEnum } from "../infra/log/log-scope.mjs";
import { LogBuilder } from "../infra/log/index.mjs";
import { Theme, themeEnum } from "./theme.mjs";
import { Screen } from "./screen.mjs";

export class StateProps {
  #opts = {
    screen: new Screen(60),
    theme: themeEnum.DARK
  };

  constructor(opts, logApp) {
    if (logApp?.constructor !== LogBuilder) {
      throw new Error(`[State props] Invalid log type ${logApp}`);
    }

    this.#opts.screen = screenLoader(opts.screen, this.#opts.screen);
    logApp.log(logScopeEnum.INFO, `Screen initialized`);

    this.#opts.theme = themeLoader(opts.theme, this.#opts.theme, logApp);
    logApp.log(logScopeEnum.INFO, `Theme ${this.#opts.theme.getName()} initialized`);
  }

  getOpts = () => this.#opts;
}

export class State {
  #logBuilder = new LogBuilder();
  #theme; ; #screen;

  #ctx; #canvas;

  constructor(canvasId, opts) {
    const { theme, screen } = new StateProps(opts, this.#logBuilder).getOpts();
    this.#theme = theme;
    this.#screen = screen;

    const canvasResult = canvasLoader(canvasId);
    this.#canvas = canvasResult.canvas;
    this.#ctx = canvasResult.ctx;

    this.#logBuilder.info("Canvas context loaded");
    this.#logBuilder.info("State initialized");
  }

  getTheme = () => this.#theme;
  getScreen = () => this.#screen;
  getCanvas = () => this.#canvas;
  ctx = () => this.#ctx;
}

function themeLoader(theme, defaultTheme, logApp) {
  if (logApp?.constructor !== LogBuilder) {
    throw new Error(`[Theme loader] Invalid log type ${logApp}`);
  }

  if (theme?.constructor !== Theme) {
    if (defaultTheme?.constructor !== Theme) {
      throw new Error(`[Theme loader] Invalid default theme type ${theme}`);
    }

    logApp.log(
      logScopeEnum.WARN,
      `Invalid theme ${theme}. Using default theme`
    );
    return defaultTheme;
  }

  return theme;
}

function screenLoader(screen, defaultScreen) {
  if (screen?.constructor === Screen) {
    return screen;
  }

  if (defaultScreen?.constructor !== Screen) {
    throw new Error(`[Screen loader] Invalid screen type ${screen}`);
  }

  return defaultScreen;
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
