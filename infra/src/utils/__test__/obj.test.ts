import { unionKeys, diffKeys } from "../obj";
import { describe, it, expect } from "vitest";

describe(unionKeys, () => {
  it("should return union of keys from two objects", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { b: 3, c: 4 };
    const result = unionKeys(obj1, obj2);
    expect(result.sort()).toEqual(["a", "b", "c"]);
  });

  it("should return all keys when objects have no common keys", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { c: 3, d: 4 };
    const result = unionKeys(obj1, obj2);
    expect(result.sort()).toEqual(["a", "b", "c", "d"]);
  });

  it("should return the keys from first object when second is empty", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = {};
    const result = unionKeys(obj1, obj2);
    expect(result.sort()).toEqual(["a", "b"]);
  });

  it("should return the keys from second object when first is empty", () => {
    const obj1 = {};
    const obj2 = { a: 1, b: 2 };
    const result = unionKeys(obj1, obj2);
    expect(result.sort()).toEqual(["a", "b"]);
  });

  it("should return an empty array when both objects are empty", () => {
    const obj1 = {};
    const obj2 = {};
    const result = unionKeys(obj1, obj2);
    expect(result).toEqual([]);
  });
});

describe(diffKeys, () => {
  it("should return keys with different values", () => {
    const obj1 = { a: 1, b: 2, c: 3 };
    const obj2 = { a: 1, b: 3, c: 3 };
    const result = diffKeys(obj1, obj2);
    expect(result).toEqual(["b"]);
  });

  it("should return all keys when objects have completely different values", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 2, b: 3 };
    const result = diffKeys(obj1, obj2);
    expect(result.sort()).toEqual(["a", "b"]);
  });

  it("should return keys that exist in only one object", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, c: 3 };
    const result = diffKeys(obj1, obj2);
    expect(result.sort()).toEqual(["b", "c"]);
  });

  it("should return an empty array when objects are identical", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2 };
    const result = diffKeys(obj1, obj2);
    expect(result).toEqual([]);
  });

  it("should return an empty array when both objects are empty", () => {
    const obj1 = {};
    const obj2 = {};
    const result = diffKeys(obj1, obj2);
    expect(result).toEqual([]);
  });

  it("should return keys that are defined but have undefined values", () => {
    const obj1 = { a: 1, b: undefined };
    const obj2 = { a: 1, b: 2 };
    const result = diffKeys(obj1, obj2);
    expect(result).toEqual(["b"]);
  });
});
