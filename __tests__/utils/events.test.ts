import { composeEvents } from 'lib/utility/events'

describe('composeEvents', () => {
  it('calls all handlers in order', () => {
    const order = []
    const fn1 = () => order.push('first')
    const fn2 = () => order.push('second')

    const composed = composeEvents(fn1, fn2)
    composed({ type: 'click' })

    expect(order).toEqual(['first', 'second'])
  })

  it('skips undefined handlers', () => {
    const fn = vi.fn()

    const composed = composeEvents(undefined, fn, undefined)
    composed({ type: 'click' })

    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('passes event and extra args to each handler', () => {
    const fn = vi.fn()
    const event = { type: 'click' }

    const composed = composeEvents(fn)
    composed(event, 'extra1', 'extra2')

    expect(fn).toHaveBeenCalledWith(event, 'extra1', 'extra2')
  })

  it('returns a function even with no handlers', () => {
    const composed = composeEvents()
    expect(() => composed({ type: 'click' })).not.toThrow()
  })
})
