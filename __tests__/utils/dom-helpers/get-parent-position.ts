import { getParentPosition } from 'lib/utility/dom-helpers'

describe('getParentPosition', () => {
  it('returns position for a single element with offsets', () => {
    const el = document.createElement('div')
    Object.defineProperty(el, 'offsetLeft', { value: 50, configurable: true })
    Object.defineProperty(el, 'offsetTop', { value: 100, configurable: true })
    Object.defineProperty(el, 'clientLeft', { value: 0, configurable: true })
    Object.defineProperty(el, 'clientTop', { value: 0, configurable: true })
    Object.defineProperty(el, 'offsetParent', { value: null, configurable: true })

    const result = getParentPosition(el)
    expect(result.x).toBe(50)
    expect(result.y).toBe(100)
  })

  it('adds clientLeft and clientTop (border widths)', () => {
    const el = document.createElement('div')
    Object.defineProperty(el, 'offsetLeft', { value: 10, configurable: true })
    Object.defineProperty(el, 'offsetTop', { value: 20, configurable: true })
    Object.defineProperty(el, 'clientLeft', { value: 2, configurable: true })
    Object.defineProperty(el, 'clientTop', { value: 3, configurable: true })
    Object.defineProperty(el, 'offsetParent', { value: null, configurable: true })

    const result = getParentPosition(el)
    expect(result.x).toBe(12) // 10 + 2
    expect(result.y).toBe(23) // 20 + 3
  })

  it('subtracts scroll for non-first elements in chain', () => {
    const parent = document.createElement('div')
    const child = document.createElement('div')

    Object.defineProperty(child, 'offsetLeft', { value: 30, configurable: true })
    Object.defineProperty(child, 'offsetTop', { value: 40, configurable: true })
    Object.defineProperty(child, 'scrollLeft', { value: 0, configurable: true })
    Object.defineProperty(child, 'scrollTop', { value: 0, configurable: true })
    Object.defineProperty(child, 'clientLeft', { value: 0, configurable: true })
    Object.defineProperty(child, 'clientTop', { value: 0, configurable: true })
    Object.defineProperty(child, 'offsetParent', { value: parent, configurable: true })

    Object.defineProperty(parent, 'offsetLeft', { value: 10, configurable: true })
    Object.defineProperty(parent, 'offsetTop', { value: 20, configurable: true })
    Object.defineProperty(parent, 'scrollLeft', { value: 5, configurable: true })
    Object.defineProperty(parent, 'scrollTop', { value: 10, configurable: true })
    Object.defineProperty(parent, 'clientLeft', { value: 0, configurable: true })
    Object.defineProperty(parent, 'clientTop', { value: 0, configurable: true })
    Object.defineProperty(parent, 'offsetParent', { value: null, configurable: true })

    const result = getParentPosition(child)
    // child: 30 (first, no scroll subtracted) + parent: 10 - 5 (scroll) = 35
    expect(result.x).toBe(35)
    // child: 40 (first, no scroll subtracted) + parent: 20 - 10 (scroll) = 50
    expect(result.y).toBe(50)
  })
})
