import { logScopeEnum } from "./log-scope.mjs";
import { Log } from "./log.mjs";

export class LogStack {
  #logs; #onlyStack = false; #loaded = false;

  constructor() {
    this.#logs = [new Log(logScopeEnum.INFO, 'LogStack initialized')];
    setTimeout(() => {
      this.#loaded = true;
    }, 100);
  }

  unshift = (log) => {
    if (log?.constructor !== Log) {
      throw new Error('[LogStack] Invalid arguments');
    }
    if (log.isOnly()) {
      this.#onlyStack = true;
    }
    if (this.#onlyStack && !log.isOnly()) {
      return this;
    }
    this.#logs.unshift(log);
    return this
  }

  splice = (limit) => {
    this.#logs.splice(limit);
    return this;
  }

  pop = async () => {
    if (!this.#loaded) {
      return undefined;
    }
    const log = this.#logs.shift();
    return log;
  }
}
