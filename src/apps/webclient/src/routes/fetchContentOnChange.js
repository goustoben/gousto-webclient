import { contentLoadContentByPageSlug } from 'actions/content'
import config from 'config/cms'

export const pathToSlug = (path) => {
  const mappings = [
    {
      path: /^welcome-to-gousto/i,
      slug: 'welcome',
    },
  ]

  const mappedPath = mappings.find((mapping) => mapping.path.test(path))

  return ((mappedPath && mappedPath.slug) ? mappedPath.slug : path)
}

export async function fetchContentOnChange(pathname = '/', store) {
  const slug = pathToSlug(pathname.split('/').slice(1)).toString()
  const routes = config.allowedRoutes
  const variant = store.getState().variants.get(slug, 'default')

  if (routes.includes(slug)) {
    await store.dispatch(contentLoadContentByPageSlug(slug, [variant]))
  }
}
