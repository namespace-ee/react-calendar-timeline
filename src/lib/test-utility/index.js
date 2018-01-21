import { JSDOM } from 'jsdom'

export function buildDom(domString) {
  return new JSDOM(`<!DOCTYPE html><body>${domString}></body>`)
}
