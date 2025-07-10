import { pick } from "../pick";
import { describe, it, expect } from "vitest";

describe(pick, () => {
  it("should pick specified keys from an object", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = pick(obj, "a", "c");
    expect(result).toEqual({ a: 1, c: 3 });
  });

  it("should return empty object when picking from empty object", () => {
    const obj = {};
    const result = pick(obj, "a", "b");
    expect(result).toEqual({});
  });

  it("should return empty object when no keys specified", () => {
    const obj = { a: 1, b: 2 };
    const result = pick(obj);
    expect(result).toEqual({});
  });

  it("should ignore keys that do not exist in the object", () => {
    const obj = { a: 1, b: 2 };
    const result = pick(obj, "a", "c", "d");
    expect(result).toEqual({ a: 1 });
  });

  it("should include nullish values", () => {
    const obj = { a: null, b: undefined, c: 3 };
    const result = pick(obj, "a", "b");
    expect(result).toEqual({ a: null, b: undefined });
  });

  it("should preserve the pulumi '__provider' property when present", () => {
    const obj = { a: 1, b: 2, __provider: "test" };
    const result = pick(obj, "a");
    expect(result).toEqual({ a: 1, __provider: "test" });
  });

  it("should handle objects with non-scalar values", () => {
    const obj = { a: { x: 1 }, b: [1, 2, 3], c: "string" };
    const result = pick(obj, "a", "b");
    expect(result).toEqual({ a: { x: 1 }, b: [1, 2, 3] });
  });
});
