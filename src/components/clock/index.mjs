import { State } from "../../models/state/index.mjs";
import { BiVector } from "../../models/vector/index.mjs";

export class Clock {
  #date; #state; #radius;

  constructor(state, date = new Date(), radius = 220) {
    if (state?.constructor !== State
          || date?.constructor !== Date
          || radius?.constructor !== Number
    ) {
      throw new Error("[Clock] Invalid arguments");
    }

    this.#date = date;
    this.#state = state;
    this.#radius = radius;
  }

  draw = () => {
    this.#drawOuterCircle();
    this.#drawNumbers();
    this.#drawHand(this.#date.getHours(), .5, 5, '95');
    this.#drawHand(this.#date.getMinutes() / 60 * 12, .7, 2, '90');
    this.#drawHand(this.#date.getSeconds() / 5, .9, 1, '80');
    this.#drawCoordinates();
  }

  #drawOuterCircle = () => {
    this.#state.ctx().beginPath();
    this.#state.ctx().arc(0, 0, this.#radius, 0, Math.PI * 2);
    this.#state.ctx().strokeStyle = this.#state.getTheme().getForegroundColor();
    this.#state.ctx().lineWidth = 10;
    this.#state.ctx().stroke();
    this.#state.ctx().closePath();
  }

  #drawNumbers = () => {
    this.#state.ctx().beginPath();
    this.#state.ctx().font = "30px Arial";
    this.#state.ctx().textAlign = "center";
    this.#state.ctx().fillStyle = this.#state.getTheme().getForegroundColor();

    for(let n=0; n<12; n++) {
      const textMeasure = this.#state.ctx().measureText(n);
      const point = this.#getPoint(n, 1.1)
        .add(new BiVector(-0.5, textMeasure.actualBoundingBoxAscent / 2));
      this.#state.ctx().fillText(n, ...point.values());
    }

    this.#state.ctx().closePath();
  }

  #drawHand = (hour, scalar = .5, lineWidth = 5, colorOffset = '') => {
    this.#state.ctx().beginPath();
    this.#state.ctx().moveTo(0, 0);
    this.#state.ctx().lineTo(...this.#getPoint(hour, scalar).values());
    this.#state.ctx().strokeStyle = this.#state.getTheme().getForegroundColor().concat(colorOffset);
    this.#state.ctx().lineWidth = lineWidth;
    this.#state.ctx().lineCap = "round";
    this.#state.ctx().stroke();
    this.#state.ctx().closePath
  }

  #drawCoordinates = () => {
    this.#state.ctx().beginPath();
    this.#state.ctx().moveTo(0, this.#radius);
    this.#state.ctx().lineTo(0, -this.#radius);
    this.#state.ctx().moveTo(this.#radius, 0);
    this.#state.ctx().lineTo(-this.#radius, 0);
    this.#state.ctx().strokeStyle = this.#state.getTheme().getForegroundColor().concat('30');
    this.#state.ctx().setLineDash([10]);
    this.#state.ctx().lineWidth = 3;
    this.#state.ctx().stroke();
    this.#state.ctx().closePath
    this.#state.ctx().setLineDash([]);
  }

  #getAngle = (hour) =>
    (2 * Math.PI / 12) * (hour % 12) - Math.PI / 2;

  #getPoint = (hour, scalar = 1) => {
    const angle = this.#getAngle(hour);
    return new BiVector(
      scalar * this.#radius * Math.cos(angle),
      scalar * this.#radius * Math.sin(angle)
    );
  }
}
