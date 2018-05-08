import { JSDOM } from 'jsdom'

export function buildDom(domString) {
  return new JSDOM(`<!DOCTYPE html><body>${domString}></body>`)
}

export function sel(selectorString) {
  return `[data-test-id="${selectorString}"]`
}

export function noop() {}
