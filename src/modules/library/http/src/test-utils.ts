export type TypeAssert<A, B> = A extends B ? true : false

export type Rec<V = unknown> = Record<string, V>
