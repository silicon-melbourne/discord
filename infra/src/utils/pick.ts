export function pick<
  T extends Record<string, unknown>,
  K extends Extract<keyof T, string>
>(obj: T, ...keys: LooseAutocomplete<K>[]): Pick<T, K> {
  const result = {} as Pick<T, K>;

  for (const key of keys) {
    // We do this assignment to `k` to satisfy the type system.
    // Safe object (record) iteration is still not simple in typescript.
    const k = key as keyof typeof result;
    if (k in obj) result[k] = obj[k];
  }

  // Magic to stop omitting the bundled provider by accident
  // @ts-ignore
  if ("__provider" in obj) result.__provider = obj.__provider;

  return result;
}
