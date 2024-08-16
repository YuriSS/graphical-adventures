export class LogScope {
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
