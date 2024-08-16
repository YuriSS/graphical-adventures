import { BiVector } from './vector.mjs';

export class Screen {
  #factor; #width; #height;

  constructor(factor) {
    this.#factor = 
      (factor?.constructor !== Number || factor <= 30 || factor > 60)
        ? 30
        : factor;

    this.#width = 16 * this.#factor;
    this.#height = 9 * this.#factor;
  }

  values = () => [this.#width, this.#height];
  plainObject = () => ({ width: this.#width, height: this.#height });
  vector = () => new BiVector(this.#width, this.#height);
}
