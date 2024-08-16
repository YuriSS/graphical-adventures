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
  #data = [[0,0]]; #MAX_SIZE = 100; #GAP = 30;

  getData = () => this.#data;
  generate = (quantity, seed) => {
    const s = Math.min(quantity, this.#MAX_SIZE);
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
