export class LogBuilder {
  #LIMIT = 50;
  #logs = [];

  log = (scope, message) => {
    this.#addLog(scope, message);
    this.#displayX(0);
  }

  memory = () => {
    this.#logs.forEach((_, i) => {
      this.#displayX(i);
    });
  }

  #addLog = (scope, message) => {
    const log = new Log(scope, message);
    this.#logs.unshift(log);
    this.#logs.splice(this.#LIMIT - 1);
  };

  #getLog = (x) => {
    const log = this.#logs[x];
    if (log?.constructor !== Log) {
      throw new Error('[LogBuilder] Index out of bounds');
    }
    return log;
  }

  #displayX = (x) => {
    const log = this.#getLog(x);
    console.log(`[${log.getScope().getValue()}] ${log.getMessage() }`);
  }
}

class Log {
  #scope; #message;

  constructor(scope, message) {
    if (scope?.constructor !== LogScope || message?.constructor !== String) {
      throw new Error('[Log] Invalid arguments');
    }

    this.#scope = scope;
    this.#message = message;
  }

  getScope = () => this.#scope;
  getMessage = () => this.#message;
}

class LogScope {
  #scope;

  constructor(scope) {
    if (scope?.constructor !== String) {
      throw new Error('[LogScope] Invalid arguments');
    }

    this.#scope = scope;
  }

  getValue = () => this.#scope;
}

export const logScopeEnum = {
  INFO: new LogScope('INFO'),
  WARN: new LogScope('WARN'),
  ERROR: new LogScope('ERROR'),
};
