export class BiVector {
  #x; #y;

  constructor(x, y) {
    if (x?.constructor !== Number || y?.constructor !== Number) {
      throw new Error(`[BiVector] Invalid arguments {${x}, ${y}}`);
    }

    this.#x = x;
    this.#y = y;
  }

  x = () => this.#x;
  y = () => this.#y;
  values = () => [this.#x, this.#y];
  plainObject = () => ({ x: this.#x, y: this.#y });

  add = (vector) => {
    return new BiVector(this.#x + vector.x(), this.#y + vector.y());
  };

  subtract = (vector) => {
    return new BiVector(this.#x - vector.x(), this.#y - vector.y());
  };

  product = (vector) => {
    return new BiVector(this.#x * vector.x(), this.#y * vector.y());
  };

  multiply = (scalar) => {
    return new BiVector(this.#x * scalar, this.#y * scalar);
  };

  divide = (scalar) => {
    return new BiVector(this.#x / scalar, this.#y / scalar);
  };

  magnitude = () => Math.sqrt(this.#x ** 2 + this.#y ** 2);

  toString() { return `{${this.#x}, ${this.#y}}` };
}
