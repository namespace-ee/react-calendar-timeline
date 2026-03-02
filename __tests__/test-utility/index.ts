import { JSDOM } from 'jsdom'

export function buildDom(domString: string) {
  return new JSDOM(`<!DOCTYPE html><body>${domString}></body>`)
}

export function sel(selectorString: string) {
  return `[data-testid="${selectorString}"]`
}

export function noop() {}

export function parsePxToNumbers(value: string) {
  return +value.replace('px', '')
}
