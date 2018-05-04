/* eslint-disable */
import { hasSomeParentTheClass } from 'lib/utility/dom-helpers'
import { buildDom } from 'test-utility'

const targetId = 'target'
describe('hasSomeParentTheClass', () => {
  describe('is false', () => {
    it('when elements parent and element doesnt have provided class', () => {
      const dom = buildDom(`<div>
        <div id=${targetId}></div>
      </div>`)

      const result = hasSomeParentTheClass(
        dom.window.document.getElementById(targetId),
        'foo'
      )

      expect(result).toBe(false)
    })

    // per PR 205
    it('doesnt throw for svg element', () => {
      const dom = buildDom(`<div>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <circle id=${targetId} cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="red" />
      </svg>
      </div>`)

      try {
        const result = hasSomeParentTheClass(
          dom.window.document.getElementById(targetId),
          'foo'
        )
        expect(result).toBe(false)
      } catch (e) {
        expect(true).toBe(false)
      }
    })
  })

  describe('is true', () => {
    const foundClass = 'my-class'
    it('when element has class', () => {
      const dom = buildDom(`<div>
        <div id=${targetId} class="${foundClass}"></div>
      </div>`)

      const result = hasSomeParentTheClass(
        dom.window.document.getElementById(targetId),
        foundClass
      )

      expect(result).toBe(true)
    })
    it('when parent has class', () => {
      const dom = buildDom(`<div>
      <div class="${foundClass}">
      <div id=${targetId}></div>

      </div>
      </div>`)

      const result = hasSomeParentTheClass(
        dom.window.document.getElementById(targetId),
        foundClass
      )

      expect(result).toBe(true)
    })
    it('when ancestor has class', () => {
      const dom = buildDom(`<div>
      <div class="${foundClass}">
      <div></div>
        <div id=${targetId}></div>
      </div>
      </div>`)

      const result = hasSomeParentTheClass(
        dom.window.document.getElementById(targetId),
        foundClass
      )

      expect(result).toBe(true)
    })
  })
})
