import { _get, _length, arraysEqual, deepObjectCompare, keyBy, noop } from 'lib/utility/generic'

describe('_get', () => {
  it('returns value from plain object by key', () => {
    expect(_get({ name: 'Alice' }, 'name')).toBe('Alice')
  })

  it('returns undefined for missing key on plain object', () => {
    expect(_get({ name: 'Alice' }, 'age')).toBeUndefined()
  })

  it('calls .get() when object has a get method (Immutable-like)', () => {
    const immutableLike = { get: (key) => (key === 'name' ? 'Bob' : undefined) }
    expect(_get(immutableLike, 'name')).toBe('Bob')
  })

  it('prefers .get() method over direct property access', () => {
    const obj = { name: 'direct', get: () => 'from-get' }
    expect(_get(obj, 'name')).toBe('from-get')
  })
})

describe('_length', () => {
  it('returns .length for arrays', () => {
    expect(_length([1, 2, 3])).toBe(3)
  })

  it('returns .length for empty arrays', () => {
    expect(_length([])).toBe(0)
  })

  it('calls .count() when object has a count method', () => {
    const immutableLike = { count: () => 5 }
    expect(_length(immutableLike)).toBe(5)
  })
})

describe('arraysEqual', () => {
  it('returns true for identical arrays', () => {
    expect(arraysEqual([1, 2, 3], [1, 2, 3])).toBe(true)
  })

  it('returns false for different lengths', () => {
    expect(arraysEqual([1, 2], [1, 2, 3])).toBe(false)
  })

  it('returns false for different elements', () => {
    expect(arraysEqual([1, 2, 3], [1, 4, 3])).toBe(false)
  })

  it('returns true for empty arrays', () => {
    expect(arraysEqual([], [])).toBe(true)
  })

  it('uses reference equality for objects', () => {
    const obj = { a: 1 }
    expect(arraysEqual([obj], [obj])).toBe(true)
    expect(arraysEqual([{ a: 1 }], [{ a: 1 }])).toBe(false)
  })
})

describe('deepObjectCompare', () => {
  it('returns true for deeply equal objects', () => {
    expect(deepObjectCompare({ a: { b: 1 } }, { a: { b: 1 } })).toBe(true)
  })

  it('returns false for different objects', () => {
    expect(deepObjectCompare({ a: 1 }, { a: 2 })).toBe(false)
  })

  it('returns true for identical primitives', () => {
    expect(deepObjectCompare(42, 42)).toBe(true)
  })
})

describe('keyBy', () => {
  it('indexes array by specified key', () => {
    const items = [
      { id: 'a', value: 1 },
      { id: 'b', value: 2 },
    ]
    expect(keyBy(items, 'id')).toEqual({
      a: { id: 'a', value: 1 },
      b: { id: 'b', value: 2 },
    })
  })

  it('last item wins on duplicate keys', () => {
    const items = [
      { id: 'a', value: 1 },
      { id: 'a', value: 2 },
    ]
    expect(keyBy(items, 'id')).toEqual({
      a: { id: 'a', value: 2 },
    })
  })

  it('returns empty object for empty array', () => {
    expect(keyBy([], 'id')).toEqual({})
  })
})

describe('noop', () => {
  it('returns undefined', () => {
    expect(noop()).toBeUndefined()
  })
})
