import { BiVector } from "../../models/vector.mjs";
import { LogBuilder } from "../../infra/log/index.mjs";
import { State } from "../../models/state.mjs";

export class DrawLine {
  #logApp;

  constructor(logApp = new LogBuilder()) {
    if (logApp?.constructor !== LogBuilder) {
      throw new Error(`[Draw line] Invalid log type ${logApp}`);
    }

    this.#logApp = logApp;
  }

  draw = (state) => {
    if (state?.constructor !== State) {
      throw new Error(`[Draw line] Invalid state type ${state}`);
    }

    return (previous, current) => {
      if (previous?.constructor !== BiVector || current?.constructor !== BiVector) {
        throw new Error(`[Draw line] Invalid arguments {${previous.constructor}, ${current}}`);
      }

      this.#logApp.info(
        `Drawing line from ${previous.values().join(', ')} to ${current.values().join(', ')}`
      );

      state.ctx().beginPath();
      state.ctx().moveTo(...previous.values());
      state.ctx().lineTo(...current.values());
      state.ctx().strokeStyle = state.getTheme().getForegroundColor();
      state.ctx().stroke();
      state.ctx().closePath();

      return current;
    }
  }
}
