// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = (value: any): value is Function => {
  return typeof value === 'function'
}

export type PickByValue<T, ValueType> = Pick<
  T,
  { [Key in keyof T]-?: T[Key] extends ValueType ? Key : never }[keyof T]
>

export type PrimitiveKeys<T> = keyof PickByValue<T, string>

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Omit<T, Keys> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Omit<T, Keys>>
  }[Keys]

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

export type RemoveNullKeys<T> = {
  [K in keyof T]: NonNullable<T[K]>
}

export type RemoveSomeUndefined<T, K extends keyof T> = RemoveNullKeys<Pick<T, K>> &
  Omit<T, K>

export type MakeAllUndefined<T> = {
  [K in keyof T]: T[K] | undefined
}
