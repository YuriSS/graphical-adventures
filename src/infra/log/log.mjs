import { LogScope } from "./log-scope.mjs";

export class Log {
  #scope; #message;
  #only;

  constructor(scope, message, only = false) {
    if (scope?.constructor !== LogScope || only?.constructor !== Boolean) {
      throw new Error('[Log] Invalid arguments');
    }

    this.#scope = scope;
    this.#message = message;
    this.#only = only;
  }

  getScope = () => this.#scope;
  getMessage = () => this.#message;
  isOnly = () => this.#only;
}
