// @vitest-environment node
import { resolve } from "path";
import * as sass from "sass";
import { overridableStyles, selectedStyle } from "lib/items/styles";

const libDir = resolve(__dirname, "../../src/lib");

const compile = (overrides = "") =>
  sass.compileString(`@use "Timeline"${overrides ? ` with (${overrides})` : ""};`, { loadPaths: [libDir] }).css;

const rootVariables = (css: string) => {
  const root = css.match(/:root \{([^}]*)\}/)![1];
  return Object.fromEntries([...root.matchAll(/(--[\w-]+): ([^;]+);/g)].map(([, name, value]) => [name, value]));
};

describe("Timeline.scss", () => {
  const css = compile();
  const variables = rootVariables(css);

  it("defaults every themed variable an inline item style reads to the same value", () => {
    const fallbacks = [...Object.values(overridableStyles), ...Object.values(selectedStyle)]
      .map((value) => String(value).match(/^var\((--[\w-]+), (.+)\)$/))
      .filter((match): match is RegExpMatchArray => match !== null && match[1] in variables);

    expect(fallbacks.length).toBeGreaterThan(0);
    for (const [, name, fallback] of fallbacks) {
      expect(variables[name]).toBe(fallback);
    }
  });

  it("exposes the chrome colours as variables with the existing defaults", () => {
    expect(variables).toMatchObject({
      "--rct-border-color": "#bbb",
      "--rct-row-even-background": "transparent",
      "--rct-row-odd-background": "rgba(0, 0, 0, 0.05)",
      "--rct-weekend-background": "rgba(250, 246, 225, 0.5)",
      "--rct-date-header-background": "rgb(240, 240, 240)",
      "--rct-date-header-color": "#fff",
      "--rct-header-background": "#c52020",
      "--rct-cursor-line-background": "#2196f3",
    });
  });

  it("reads colours from the variables instead of hardcoding them in rules", () => {
    const rules = css.replace(/:root \{[^}]*\}/, "");
    for (const value of ["#bbb", "rgba(0, 0, 0, 0.05)", "rgba(250, 246, 225, 0.5)", "rgb(240, 240, 240)"]) {
      expect(rules).not.toContain(value);
    }
  });

  it("applies the item line-height from the stylesheet so consumers can override it", () => {
    expect(css).toMatch(/\.rct-item \{\s*line-height: var\(--rct-item-line-height, var\(--rct-item-height\)\);/);
  });

  it("feeds SCSS overrides into the variables", () => {
    const overridden = rootVariables(compile("$border-color: red, $item-border: none"));
    expect(overridden["--rct-border-color"]).toBe("red");
    expect(overridden).not.toHaveProperty("--rct-item-border-color");
  });
});
