export enum NumberOfPortions {
  TWO = 2,
  FOUR = 4,
}

export const STOCK_LEVEL_NONE = 0
export const STOCK_LEVEL_MAX = 1000

export type UseStockDependencies = {
  /**
   * The stock of a recipe must be HIGHER than `minimumThreshold` to be considered "in stock"
   *
   * This defaults to 0 if not provided.
   */
  minimumThreshold?: number
}
