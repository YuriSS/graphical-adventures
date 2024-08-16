import { logScopeEnum } from "./log-scope.mjs";
import { LogStack } from "./log-stack.mjs";
import { Log } from "./log.mjs";

const logs = new LogStack();

export class LogBuilder {
  #LIMIT = 100;

  log = (scope, message) => {
    this.#addLog(scope, message);
  }

  info = (message) => {
    this.log(logScopeEnum.INFO, message);
  }

  warn = (message) => {
    this.log(logScopeEnum.WARN, message);
  }

  error = (message) => {
    this.log(logScopeEnum.ERROR, message);
  }

  only = (message, scope = logScopeEnum.INFO) => {
    this.#addLog(scope, message, true);
  }

  #addLog = (scope, message, asOnly) => {
    const log = new Log(scope, message, asOnly);
    logs.unshift(log);
    logs.splice(this.#LIMIT - 1);
    this.#display();
  };

  #display = async () => {
    const log = await logs.pop();

    if (log === undefined) {
      return;
    }

    console.log(`[${log.getScope().getValue()}] `, log.getMessage());
  }
}
