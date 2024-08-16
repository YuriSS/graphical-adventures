import { State } from "./models/state.mjs";

const state = new State("graph");

document.body.style.backgroundColor = state.getTheme().getBackgroundColor();
document.body.style.color = state.getTheme().getForegroundColor();

state.getCanvas().width = state.getScreen().values()[0];
state.getCanvas().height = state.getScreen().values()[1];

state.ctx().beginPath();
state.ctx().moveTo(0, 0);
state.ctx().lineTo(100, 100);
state.ctx().strokeStyle = state.getTheme().getForegroundColor();
state.ctx().stroke();
state.ctx().closePath();
