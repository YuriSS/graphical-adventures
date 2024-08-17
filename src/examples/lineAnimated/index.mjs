import { GeneratedData } from "../../data-set.mjs";
import { State } from "../../models/state/index.mjs";
import { BiVector } from "../../models/vector/index.mjs";
import { Screen } from "../../models/screen/index.mjs";
import { DrawLine } from "../../components/drawLine/index.mjs";
import { LogBuilder } from "../../infra/log/index.mjs";

const state = new State("graph", { screen: new Screen(60) });
const log = new LogBuilder();
log.only("Muted logs");

document.body.style.backgroundColor = state.getTheme().getBackgroundColor();
document.body.style.color = state.getTheme().getForegroundColor();

state.getCanvas().width = state.getScreen().values()[0];
state.getCanvas().height = state.getScreen().values()[1];

const GAP = 100;
const SEED = 100;
const MAX_SET = 30;
const dataGenerator = new GeneratedData();
let running = true;

const mapDataSetToBiVector = (dataGenerator) => {
  if (dataGenerator?.constructor !== GeneratedData) {
    throw new Error("[Map data set to BiVector] Invalid arguments");
  }

  return dataGenerator
          .generate(SEED, 1, GAP)
          .getData()
          .map((data) => new BiVector(...data));
};

const dataSet = mapDataSetToBiVector(dataGenerator).concat(mapDataSetToBiVector(dataGenerator)[0].add(new BiVector(GAP, 0)));
const drawer = new DrawLine();

function draw() {
  state.ctx().clearRect(0, 0, state.getScreen().vector().x(), state.getScreen().vector().y());
  dataSet.reduce(drawer.draw(state));
  if (running) window.requestAnimationFrame(draw);
}

setInterval(() => {
  if (!running) return;
  const next = mapDataSetToBiVector(dataGenerator)[0];
  if (next === undefined) return;
  if (dataSet.length >= MAX_SET) {
    dataSet.splice(0, 1);
    dataSet.forEach((vector) => {
      return vector.subtract(new BiVector(GAP, 0));
    });
  }
  dataSet.push(next.add(new BiVector(dataSet.length * GAP, 0)));
}, 100);

window.requestAnimationFrame(draw);

document.getElementById("stop").addEventListener("click", () => {
  running = !running;
  if (running) window.requestAnimationFrame(draw);
});
