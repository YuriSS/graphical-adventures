import { LogBuilder, logScopeEnum } from "./infra/log.mjs";

const logBuilder = new LogBuilder();

for (let i = 0; i < 100; i++) {
  logBuilder.log(logScopeEnum.INFO, `Hello, world! ${i}`);
}

console.log('\n\n\n');

logBuilder.memory();
