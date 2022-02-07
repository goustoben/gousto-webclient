import type { TypesEqual } from '_testing/typesEqual'
import { FirstOfTuple, LastOfTuple } from '../array'

describe('array type utils', () => {
  describe('LastOfTuple', () => {
    it('Tuple [string, boolean, number] -> number', () => {
      type Input = [string, boolean, number]
      type Output = LastOfTuple<Input>

      const typeCheck: TypesEqual<Output, number> = true
    })

    it('Tuple with nested type ["foo", NestedType] -> NestedType', () => {
      type NestedType = (a: string) => boolean
      type Input = ['foo', NestedType]
      type Output = LastOfTuple<Input>

      const typecheck: TypesEqual<Output, NestedType> = true
    })

    it('Tuple with single item ["foo"] -> "foo"', () => {
      type NestedType = (a: string) => boolean
      type Input = ['foo']
      type Output = LastOfTuple<Input>

      const typecheck: TypesEqual<Output, 'foo'> = true
    })

    it('Simple array type string[] -> string', () => {
      type Input = string[]
      type Output = LastOfTuple<Input>

      const typeCheck: TypesEqual<Output, string> = true
    })
  })

  describe('FirstOfTuple', () => {
    it('Tuple [string, boolean, number] -> number', () => {
      type Input = [string, boolean, number]
      type Output = FirstOfTuple<Input>

      const typeCheck: TypesEqual<Output, string> = true
    })

    it('Tuple with nested type ["foo", NestedType] -> NestedType', () => {
      type NestedType = (a: string) => boolean
      type Input = [NestedType, 'foo']
      type Output = FirstOfTuple<Input>

      const typecheck: TypesEqual<Output, NestedType> = true
    })

    it('Tuple with single item ["foo"] -> "foo"', () => {
      type NestedType = (a: string) => boolean
      type Input = ['foo']
      type Output = FirstOfTuple<Input>

      const typecheck: TypesEqual<Output, 'foo'> = true
    })

    it('Simple array type string[] -> string', () => {
      type Input = string[]
      type Output = FirstOfTuple<Input>

      const typeCheck: TypesEqual<Output, string> = true
    })
  })
})
