import { JSDOM } from 'jsdom'

export function buildDom(domString) {
  return new JSDOM(`<!DOCTYPE html><body>${domString}></body>`)
}

export function sel(selectorString) {
  return `[data-testid="${selectorString}"]`
}

export function noop() {}

export function parsePxToNumbers(value) {
  return +value.replace('px', '')
}