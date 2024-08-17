import { logScopeEnum } from "../../infra/log/log-scope.mjs";
import { LogBuilder } from "../../infra/log/index.mjs";
import { Theme, themeEnum } from "../theme/index.mjs";
import { Screen } from "../screen/index.mjs";

export class StateProps {
  #logApp = new LogBuilder();
  #opts = {
    screen: new Screen(60),
    theme: themeEnum.DARK
  };

  constructor(opts) {
    this.#opts.screen = this.#screenLoader(opts.screen, this.#opts.screen);
    this.#logApp.log(logScopeEnum.INFO, `Screen initialized`);

    this.#opts.theme = this.#themeLoader(opts.theme, this.#opts.theme, this.#logApp);
    this.#logApp.log(logScopeEnum.INFO, `Theme ${this.#opts.theme.getName()} initialized`);
  }

  getOpts = () => this.#opts;

  #themeLoader = (theme, defaultTheme) => {
    if (theme?.constructor !== Theme) {
      if (defaultTheme?.constructor !== Theme) {
        throw new Error(`[Theme loader] Invalid default theme type ${theme}`);
      }

      this.#logApp.log(
        logScopeEnum.WARN,
        `Invalid theme ${theme}. Using default theme`
      );
      return defaultTheme;
    }

    return theme;
  }

  #screenLoader(screen, defaultScreen) {
    if (screen?.constructor === Screen) {
      return screen;
    }

    if (defaultScreen?.constructor !== Screen) {
      throw new Error(`[Screen loader] Invalid screen type ${screen}`);
    }

    return defaultScreen;
  }
}
