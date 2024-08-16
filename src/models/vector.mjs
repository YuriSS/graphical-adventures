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
    this.#x += vector.x();
    this.#y += vector.y();
  };

  subtract = (vector) => {
    this.#x -= vector.x();
    this.#y -= vector.y();
  };

  multiply = (scalar) => {
    this.#x *= scalar;
    this.#y *= scalar;
  };

  divide = (scalar) => {
    this.#x /= scalar;
    this.#y /= scalar;
  };

  magnitude = () => Math.sqrt(this.#x ** 2 + this.#y ** 2);
}
