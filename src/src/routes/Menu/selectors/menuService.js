import moment from 'moment'
export const getPreviewMenuDateForCutoff = ({ menuService }) => {
  const menuAttributes = menuService.data && menuService.data[0] && menuService.data[0].attributes

  if (!menuAttributes) {
    return null
  }

  const menuCutoff = moment(menuAttributes.ends_at).subtract(1, 'days').format('YYYY-MM-DD')

  return menuCutoff
}
