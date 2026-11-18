import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { compileString } from "sass";

const source = readFileSync(resolve("src/lib/Timeline.scss"), "utf8");

function headerRule(scss: string): string {
  const css = compileString(scss).css;
  const rule = css.match(/\.rct-header-root\s*\{[^}]*\}/)?.[0];
  if (!rule) throw new Error("missing .rct-header-root");
  return rule;
}

describe("sidebar header color", () => {
  it("defaults to white", () => {
    expect(headerRule(source)).toMatch(/color:\s*#ffffff/);
  });

  it("follows an overridden $sidebar-color", () => {
    expect(headerRule(`$sidebar-color: #123456;\n${source}`)).toMatch(/color:\s*#123456/);
  });
});
