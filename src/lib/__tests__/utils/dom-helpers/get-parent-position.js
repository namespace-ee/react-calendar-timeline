/* eslint-disable */
import { getParentPosition } from '../../../utility/dom-helpers'
import { JSDOM } from 'jsdom'

const buildDom = domString => new JSDOM(`<!DOCTYPE html><body>${domString}></body>`)

describe('getParentPosition', () => {})
