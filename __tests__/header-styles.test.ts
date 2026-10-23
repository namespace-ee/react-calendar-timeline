import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { compileString } from "sass";

const stylesheet = readFileSync(resolve("src/lib/Timeline.scss"), "utf8");

function headerRule(configuration = "") {
  const { css } = compileString(configuration + stylesheet);
  return css.match(/\.react-calendar-timeline \.rct-header-root\s*\{([^}]+)\}/)?.[1];
}

it("preserves the default sidebar header contrast without inline styles", () => {
  expect(headerRule()).toMatch(/color: #ffffff;/);
});

it("allows themes to configure the sidebar header text color", () => {
  expect(headerRule("$sidebar-color: #123456;\n")).toMatch(/color: #123456;/);
});
