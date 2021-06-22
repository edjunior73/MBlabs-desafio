import { PrimitiveKeys } from './types'

type IGrouped<T, K extends PrimitiveKeys<T>> = {
  [P in T[K] extends string ? T[K] : string]: T[]
}

export const groupByKey = <T, K extends PrimitiveKeys<T>>(
  items: T[],
  key: K
): IGrouped<T, K> => {
  return items.reduce((a, b) => {
    // @ts-ignore
    a[b[key]] = [...(a[b[key]] || []), b]
    return a
  }, {}) as IGrouped<T, K>
}
