import { GeneratedData } from "../../data-set.mjs";
import { logScopeEnum } from "../../infra/log.mjs";
import { State } from "../../models/state/index.mjs";
import { BiVector } from "../../models/vector/index.mjs";
import { Screen } from "../../models/screen/index.mjs";

const state = new State("graph", { screen: new Screen(200) });
let running = true;

document.body.style.backgroundColor = state.getTheme().getBackgroundColor();
document.body.style.color = state.getTheme().getForegroundColor();

state.getCanvas().width = state.getScreen().values()[0];
state.getCanvas().height = state.getScreen().values()[1];

const dataGenerator = new GeneratedData();
const mapDataSetToBiVector = (dataSet) =>
  dataSet.map((data) => new BiVector(...data));

function draw() {
  const data = mapDataSetToBiVector(
    dataGenerator.generate(1000, 100).getData()
  );

  state.ctx().clearRect(0, 0, state.getScreen().vector().x(), state.getScreen().vector().y());
  data.reduce((previous, current) => {
    state.log(
      logScopeEnum.INFO,
      `Drawing line from ${previous.values().join(', ')} to ${current.values().join(', ')}`
    );

    state.ctx().beginPath();
    state.ctx().moveTo(...previous.values());
    state.ctx().lineTo(...current.values());
    state.ctx().strokeStyle = state.getTheme().getForegroundColor();
    state.ctx().stroke();
    state.ctx().closePath();

    return current;
  });

  if (running) window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);

document.getElementById("stop").addEventListener("click", () => {
  running = !running;
  if (running) window.requestAnimationFrame(draw);
});
