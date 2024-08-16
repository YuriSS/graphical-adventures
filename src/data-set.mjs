import { LogBuilder } from "./infra/log/index.mjs";

export const simpleDataSet = [
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 8],
  [8, 9],
  [9, 10],
  [10, 11],
];

export class GeneratedData {
  #data = [[0,0]]; #MAX_SIZE = 100; #GAP = 30; #seed = 100;
  #appLog = new LogBuilder();

  getData = () => this.#data;
  generate = (seed = this.#seed, quantity = this.#MAX_SIZE, gap = this.#GAP) => {
    if (seed?.constructor !== Number
          || quantity?.constructor !== Number
          || gap?.constructor !== Number
    ) {
      throw new Error("[Generate randon data] Invalid arguments");
    }

    this.#appLog.only(`Generating data with seed: ${seed}, quantity: ${quantity}, gap: ${gap}`);

    const s = Math.min(quantity, gap);
    this.#data = new Array(s).fill(0).map((_, i) => {
      const n = Math.floor(Math.random() * seed);
      return [
        Math.floor(i * this.#GAP),
        n
      ];
    });
    return this;
  }
}

export default simpleDataSet;
