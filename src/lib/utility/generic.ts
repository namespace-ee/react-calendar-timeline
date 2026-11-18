type GetObject = Record<string, any>;

export function _get(object: GetObject, key: string): any {
  return object[key];
}

export function arraysEqual<T>(array1: T[], array2: T[]): boolean {
  return array1.length === array2.length && array1.every((element, index) => element === array2[index]);
}

export function keyBy<T>(value: T[], key: keyof T): Record<string, T> {
  const obj: Record<string, T> = {};

  value.forEach((element) => {
    obj[element[key] as string] = element;
  });

  return obj;
}

export function noop() {}
