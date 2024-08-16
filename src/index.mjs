import { State } from "./models/state.mjs";
import { Screen } from "./models/screen.mjs";
import { LogBuilder } from "./infra/log/index.mjs";

const state = new State("graph", { screen: new Screen(60) });
const log = new LogBuilder();
log.only("Muted logs");

document.body.style.backgroundColor = state.getTheme().getBackgroundColor();
document.body.style.color = state.getTheme().getForegroundColor();

state.getCanvas().width = state.getScreen().values()[0];
state.getCanvas().height = state.getScreen().values()[1];
