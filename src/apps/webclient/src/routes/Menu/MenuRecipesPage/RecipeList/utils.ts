export function areEqualArrays(a: any[] | null, b: any[] | null): boolean {
  if (a === b) {
    return true
  }

  if (!Array.isArray(a) || !Array.isArray(b)) {
    return false
  }

  if (a.length !== b.length) {
    return false
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false
    }
  }

  return true
}
