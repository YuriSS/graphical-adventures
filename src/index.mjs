import { State } from "./models/state/index.mjs";
import { Screen } from "./models/screen/index.mjs";
import { BiVector } from "./models/vector/index.mjs";

const state = new State("graph", { screen: new Screen(100) });

document.body.style.textAlign = 'center';
document.body.style.backgroundColor = state.getTheme().getBackgroundColor();
document.body.style.color = state.getTheme().getForegroundColor();

state.getCanvas().width = state.getScreen().values()[0];
state.getCanvas().height = state.getScreen().values()[1];

normalizeOrigin(state);
drawCoordinates(state);
grid(state, 100);

function grid(state, squareQuantity = 10) {
  if (state?.constructor !== State || squareQuantity?.constructor !== Number) {
    throw new Error("[Grid] Invalid arguments");
  }

  const screenSize = state.getScreen().vector();
  const gapX = (screenSize.x() - 2) / squareQuantity;
  const gapY = (screenSize.y() - 2) / squareQuantity;
  state.ctx().beginPath();
  state.ctx().strokeStyle = state.getTheme().getForegroundColor().concat('10');
  for (let x = -screenSize.x() + 2; x < screenSize.x(); x += gapX) {
    state.ctx().moveTo(x, -screenSize.y());
    state.ctx().lineTo(x, screenSize.y());
  }
  for (let y = -screenSize.y() + 2; y < screenSize.y(); y += gapY) {
    state.ctx().moveTo(-screenSize.x(), y);
    state.ctx().lineTo(screenSize.x(), y);
  }
  state.ctx().stroke();
  state.ctx().closePath();
}

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
  state.ctx().strokeStyle = state.getTheme().getForegroundColor().concat('10');
  state.ctx().stroke();
  state.ctx().closePath();
}
