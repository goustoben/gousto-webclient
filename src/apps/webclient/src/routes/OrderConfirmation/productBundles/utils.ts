import moment from 'moment'

import { bundles } from './bundles'

export const dateToMenuWeek = (menuWeekStart: string): string => {
  const date = moment(menuWeekStart).format('YYYY/MM/DD')

  switch (date) {
    case '2022/06/14':
      return '516'
    case '2022/06/21':
      return '517'
    case '2022/06/28':
      return '518'
    case '2022/07/05':
      return '519'
    case '2022/07/12':
      return '520'
    case '2022/07/19':
      return '521'
    default:
      return ''
  }
}

export const getBundles = (menuWeekStart: string) => {
  const menuWeek: string = dateToMenuWeek(menuWeekStart)

  if (menuWeek) {
    const data = bundles
      .filter((bundle) => bundle.menuWeek === menuWeek)
      .map((bundleData) => bundleData.bundles)
      .reduce((acc, bundleData) => [...acc, ...bundleData], [])

    return data
  }

  return []
}
