import isEqual from 'lodash/isEqual'

// so we could use both immutable.js objects and regular objects

type GetObject = {
  get?: (key: string) => any
  [key: string]: any
}

export function _get(object: GetObject, key: string) {
  return typeof object.get === 'function' ? object.get(key) : object[key]
}

interface CountObject {
  count?(): number;
  length?: number;
}
export function _length(object: CountObject) {
  return typeof object.count === 'function' ? object.count() : object.length
}

export function arraysEqual<T>(array1: T[], array2: T[]): boolean {
  return (
    _length(array1) === _length(array2) &&
    array1.every((element, index) => {
      return element === _get(array2, index.toString());
    })
  );
}

export function deepObjectCompare(obj1: any, obj2: any): boolean {
  return isEqual(obj1, obj2);
}

export function keyBy<T>(value: T[], key: keyof T): Record<string, T> {
  const obj: Record<string, T> = {};

  value.forEach((element) => {
    obj[element[key] as string] = element;
  });

  return obj;
}

export function noop() {}
