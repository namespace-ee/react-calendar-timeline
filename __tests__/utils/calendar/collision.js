/* eslint-disable */
import { collision } from 'lib/utility/calendar'

const buildObject = (x, y, width, height) => ({
  collisionLeft: x,
  top: y,
  collisionWidth: width,
  height
})

describe('collision', () => {
  describe('left collision', () => {
    it('overlaps', () => {
      const subject = buildObject(45, 0, 50, 50)
      const collidingObject = buildObject(0, 0, 50, 50)

      const result = collision(subject, collidingObject)

      expect(result).toBe(true)
    })

    it('does not overlap', () => {
      const subject = buildObject(50, 0, 50, 50)
      const collidingObject = buildObject(0, 0, 50, 50)

      const result = collision(subject, collidingObject)

      expect(result).toBe(false)
    })
  })

  describe('right collision', () => {
    it('overlaps', () => {
      const subject = buildObject(0, 0, 50, 50)
      const collidingObject = buildObject(45, 0, 50, 50)

      const result = collision(subject, collidingObject)

      expect(result).toBe(true)
    })

    it('does not overlap', () => {
      const subject = buildObject(0, 0, 50, 50)
      const collidingObject = buildObject(50, 0, 50, 50)

      const result = collision(subject, collidingObject)

      expect(result).toBe(false)
    })
  })

  describe('top collision', () => {
    it('overlaps', () => {
      const subject = buildObject(0, 40, 50, 50)
      const collidingObject = buildObject(0, 30, 50, 50)

      const result = collision(subject, collidingObject)

      expect(result).toBe(true)
    })

    it('does not overlap', () => {
      const subject = buildObject(0, 50, 50, 50)
      const collidingObject = buildObject(0, 0, 50, 50)

      const result = collision(subject, collidingObject)

      expect(result).toBe(false)
    })
  })

  describe('bottom collision', () => {
    it('overlaps', () => {
      const subject = buildObject(0, 30, 50, 50)
      const collidingObject = buildObject(0, 50, 50, 50)

      const result = collision(subject, collidingObject)

      expect(result).toBe(true)
    })

    it('does not overlap', () => {
      const subject = buildObject(0, 0, 50, 50)
      const collidingObject = buildObject(0, 50, 50, 50)

      const result = collision(subject, collidingObject)

      expect(result).toBe(false)
    })
  })
})
