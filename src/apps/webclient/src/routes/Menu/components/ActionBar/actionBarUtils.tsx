export const ordinal = (n: number): string => {
  if (n === 1) {
    return '1st'
  } else if (n === 2) {
    return '2nd'
  } else if (n === 3) {
    return '3rd'
  } else {
    return `${n}th`
  }
}

const pound = '£'
const dash = '—'
export const formatOptionalPrice = (amount?: string | null): string => {
  if (amount === null || amount === undefined || amount === '') {
    return `${pound}${dash}`
  }
  const float = parseFloat(amount)
  if (Number.isNaN(float)) {
    return `${pound}${dash}`
  }

  return `${pound}${float.toFixed(2)}`
}
