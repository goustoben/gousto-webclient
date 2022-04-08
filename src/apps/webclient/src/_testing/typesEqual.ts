/**
 * This util allows you to test more complex TypeScript types. It derives a
 * true/false type to say whether two types are equivalent.
 *
 * You use it like this:
 *
 * const typeCheck: TypesEqual<TypeA, TypeB> = true
 *
 * Or the negative:
 * const typeCheck: TypesEqual<TypeA, TypeB> = false
 *
 * If the typesEqual value doesn't match what you expect, your test will fail to compile
 */

export type TypesEqual<A, B> = A extends B ? true : false
