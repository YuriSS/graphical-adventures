import { State } from "./models/state/index.mjs";
import { Screen } from "./models/screen/index.mjs";
import { BiVector } from "./models/vector/index.mjs";
import { Clock } from "./components/clock/index.mjs";
import { LogBuilder } from "./infra/log/index.mjs";

const state = new State("graph", { screen: new Screen(60) });

document.body.style.textAlign = 'center';
document.body.style.backgroundColor = state.getTheme().getBackgroundColor();
document.body.style.color = state.getTheme().getForegroundColor();

state.getCanvas().width = state.getScreen().values()[0];
state.getCanvas().height = state.getScreen().values()[1];

normalizeOrigin(state);

function draw() {
  state.ctx().clearRect(
    -state.getScreen().vector().x() / 2,
    -state.getScreen().vector().y() / 2, state.getScreen().vector().x(), state.getScreen().vector().y()
  );
  new Clock(state).draw();
  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

function normalizeOrigin(state) {
  if (state?.constructor !== State) {
    throw new Error("[Normalize Origin] Invalid arguments");
  }

  const origin = new BiVector(
    state.getScreen().vector().x() / 2,
    state.getScreen().vector().y() / 2
  );

  state.ctx().translate(...origin.values());
}

function drawCoordinates(state) {
  if (state?.constructor !== State) {
    throw new Error("[Draw Coordinates] Invalid arguments");
  }
  state.ctx().beginPath();
  state.ctx().moveTo(0, state.getScreen().vector().y() * -1);
  state.ctx().lineTo(0, state.getScreen().vector().y());
  state.ctx().moveTo(state.getScreen().vector().x() * -1, 0);
  state.ctx().lineTo(state.getScreen().vector().x(), 0);
  state.ctx().strokeStyle = state.getTheme().getForegroundColor();
  state.ctx().stroke();
  state.ctx().closePath();
}
