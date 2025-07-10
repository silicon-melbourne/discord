type R = Record<string, unknown>;

/**
 * Returns all unique keys from both objects.
 */
export function unionKeys<T extends R, J extends R>(
  obj1: T,
  obj2: J
): string[] {
  const set1 = new Set(Object.keys(obj1));
  const set2 = new Set(Object.keys(obj2));

  return [...set1.union(set2)];
}

/**
 * Returns the keys where objects have non-equal values (as determined by `===`)
 */
export function diffKeys<T extends R, J extends R>(obj1: T, obj2: J): string[] {
  const keys = unionKeys(obj1, obj2);

  if (keys.length === 0) return [];

  return keys.filter((key) => obj1[key] !== obj2[key]);
}
