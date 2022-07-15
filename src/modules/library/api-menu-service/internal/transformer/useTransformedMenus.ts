import { useMemo } from 'react'
import { getMenuIdForDate } from "../date/getMenuIdForDate"
import { useNormalisedData } from '../http/useNormalisedData'
import { transformMenu } from "./transformMenu"

export function useTransformedMenus(menuServiceData: ReturnType<typeof useNormalisedData>) {
  return useMemo(() => {
    if (!menuServiceData) {
      return []
    }

    const menus = menuServiceData.data

    return menus.map((menu) => {
      const { collections, recipes } = transformMenu(menuServiceData, menu)

      return {
        menu,
        collections,
        recipes,
      }
    })
  }, [menuServiceData])
}

export function useTransformedMenuForDate(menuServiceData: ReturnType<typeof useNormalisedData>, date: string) {
  const menus = useTransformedMenus(menuServiceData)

  return useMemo(() => {
    const id = getMenuIdForDate(menuServiceData, date)

    if (!id) {
      return {
        menu : null,
        collections: [],
        recipes: [],
      };
    }

    return menus.find(m => m.menu) || {
      menu : null,
      collections: [],
      recipes: [],
    }
  }, [menuServiceData, date, menus])
}
