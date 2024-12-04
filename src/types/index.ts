export type TQueryValue = string | number | boolean | null | undefined;

export type TQueryValidator<T> = (
  key: keyof T,
  value: string
) => T[keyof T] | false;
