import { logScopeEnum } from "./log-scope.mjs";
import { Log } from "./log.mjs";

export class LogStack {
  #logs; #onlyStack = false;

  constructor() {
    this.#logs = [new Log(logScopeEnum.INFO, 'LogStack initialized')];
  }

  unshift = (log) => {
    if (log?.constructor !== Log) {
      throw new Error('[LogStack] Invalid arguments');
    }
    if (log.isOnly()) {
      this.#onlyStack = true;
    }
    this.#logs.unshift(log);
    return this
  }

  splice = (limit) => {
    this.#logs.splice(limit);
    return this;
  }

  pop = async () => {
    const log = this.#logs.shift();
    if (this.#onlyStack && !log.isOnly()) {
      return undefined;
    }
    return log;
  }
}
