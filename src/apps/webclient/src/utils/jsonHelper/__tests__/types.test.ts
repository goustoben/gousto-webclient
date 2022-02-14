import type { TypesEqual } from '_testing/typesEqual'
import { SnakeToCamelCase, CamelCasedValue } from '../../jsonHelper/camelCasing'

describe('SnakeToCamelCase generic type', () => {
  test('Literal "foo_bar" -> "fooBar"', () => {
    type Input = 'foo_bar'
    type Output = SnakeToCamelCase<Input>
    const typeCheck: TypesEqual<Output, 'fooBar'> = true
  })

  test('Literal "foo_bar_bam" -> "fooBarBam"', () => {
    type Input = 'foo_bar_bam'
    type Output = SnakeToCamelCase<Input>
    const typeCheck: TypesEqual<Output, 'fooBarBam'> = true
  })

  test('Literal "foo_barBam" -> "fooBarBam', () => {
    type Input = 'foo_barBam'
    type Output = SnakeToCamelCase<Input>
    const typeCheck: TypesEqual<Output, 'fooBarBam'> = true
  })

  test('Literal "_prefixed" -> "Prefixed', () => {
    type Input = '_prefixed'
    type Output = SnakeToCamelCase<Input>
    const typeCheck: TypesEqual<Output, 'Prefixed'> = true
  })

  test('Literal "suffixed_" -> "suffixed_" (no change)', () => {
    type Input = 'suffixed_'
    type Output = SnakeToCamelCase<Input>
    const typeCheck: TypesEqual<Output, 'suffixed_'> = true
  })
})

describe("SnakeCasedValue", () => {
  describe('given a record with string keys', () => {
    type Input = {
      snake_case: true,
      snake_case_long: true,
      camelCase: true,
      _prefixed: true,
      suffixed_: true,
      uncased: true,
    }

    type Output = CamelCasedValue<Input>

    test('swaps snake_case keys', () => {
      const typeCheck1: TypesEqual<Output, { snakeCase: true }> = true
      const typeCheck2: TypesEqual<Output, { snakeCaseLong: true }> = true
    })

    test('transforms _prefixed keys', () => {
      const typeCheck: TypesEqual<Output, { Prefixed: true }> = true
    })

    test('preserves other keys', () => {
      const typeCheck: TypesEqual<Output, { camelCase: true, uncased: true }> = true
    })
  })

  describe('given an array with records', () => {
    type Input = Array<Record<'snake_case' | 'snake_case_long', string>>
    type Output = CamelCasedValue<Input>

    test('transforms array items', () => {
      const typeCheck: TypesEqual<Output, Array<Record<'snakeCase' | 'snakeCaseLong', string>>> = true
    })
  })
})
