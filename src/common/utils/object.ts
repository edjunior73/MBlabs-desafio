import { MakeAllUndefined, RemoveSomeUndefined, RequiredKeys } from './types'

type NonNullKeys<T> = RemoveSomeUndefined<MakeAllUndefined<Required<T>>, RequiredKeys<T>>

export const getNonNullKeys = <T extends { [key: string]: any }>(obj: T): NonNullKeys<T> =>
  Object.fromEntries(
    Object.entries(obj).filter(
      ([, value]) => value !== null && typeof value !== 'undefined' && value !== ''
    )
  ) as NonNullKeys<T>
