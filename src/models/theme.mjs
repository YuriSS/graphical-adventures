export class Theme {
  #colorScheme;
  #name;

  constructor(name, colorScheme) {
    if (name?.constructor !== String || colorScheme?.constructor !== ColorScheme) {
      throw new Error('[Theme] Invalid arguments');
    }
    this.#colorScheme = colorScheme;
    this.#name = name;
  }

  getColorScheme = () => this.#colorScheme;
  getName = () => this.#name;
  getBackgroundColor = () => this.#colorScheme.getSecondary();
  getForegroundColor = () => this.#colorScheme.getPrimary();
}

export class ColorScheme {
  #primary; #secondary;

  constructor(primary, secondary) {
    if (primary?.constructor !== String || secondary?.constructor !== String) {
      throw new Error('[ColorScheme] Invalid arguments');
    }
    this.#primary = primary;
    this.#secondary = secondary;
  }

  getPrimary = () => this.#primary;
  getSecondary = () => this.#secondary;
}

export const themeEnum = {
  LIGHT: new Theme('Light theme', new ColorScheme('#333', '#CCC')),
  DARK: new Theme('Dark theme', new ColorScheme('#CCC', '#333')),
};
