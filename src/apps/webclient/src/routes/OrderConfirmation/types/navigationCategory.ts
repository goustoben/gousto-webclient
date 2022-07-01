export type NavigationCategory = {
  id: string
  label: string
  count: number
}
export type NavigationCategories = {
  [key: string]: NavigationCategory
}
