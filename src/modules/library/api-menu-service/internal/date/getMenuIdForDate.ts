import { MenuServiceData } from '../http'

export function getMenuIdForDate(menuServiceData: MenuServiceData | null, date: string) {
  if (!menuServiceData) {
    return null
  }

  const isPreviewMenu = menuServiceData.meta && menuServiceData.meta.isPreviewMenu

  if (!menuServiceData.data) {
    return null
  }

  if (isPreviewMenu || !date) {
    const defaultFallbackMenu = menuServiceData.data[0]

    return defaultFallbackMenu?.id || null
  }

  const queryDate = new Date(date)

  const menu = menuServiceData.data.find((menu) => queryDate.getTime() <= new Date(menu.attributes.ends_at).getTime())

  return menu?.id || null
}
