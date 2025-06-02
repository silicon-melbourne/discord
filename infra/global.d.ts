type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;

// Helper: prettify a computed type so it shows nicely in editors
type Prettify<T> = { [P in keyof T]: T[P] } & {};

// Merge U with K, but ONLY for fields U already has
type _MergeIfPresent<U, K> = Omit<U, Extract<keyof K, keyof U>> &
  Pick<K, Extract<keyof K, keyof U>>;

/**
 * Distributes over a union and merges in K,
 * but only where the member already defines that key.
 */
export type DistributiveMerge<
  T,
  K extends { [k in keyof T]?: any }
> = T extends any ? Prettify<_MergeIfPresent<T, K>> : never;
