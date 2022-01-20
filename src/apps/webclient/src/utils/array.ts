export function last<T>(array: T[]): T {
  return array[array.length - 1]
}

export function filterExists<T>(input: T | null | undefined): input is T {
  return !!input
}
