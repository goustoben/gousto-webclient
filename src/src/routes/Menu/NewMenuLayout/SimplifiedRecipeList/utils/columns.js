export const getNoOfColumns = () => {
  if (typeof window !== 'undefined' && window.innerWidth) {
    switch (true) {
    case (window.innerWidth > 1400):
      return 5
    case (window.innerWidth > 1024):
      return 4
    default:
      return 3
    }
  }

  return 3
}
