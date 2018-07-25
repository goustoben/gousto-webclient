import actions from 'actions'
import config from 'config/cms'

const pathToSlug = (path) => {
	const mappings = [
		{
			path: /^welcome-to-gousto/i,
			slug: 'welcome',
		},

		{
			path: /^$/i,
			slug: 'homepage',
		},
	]

	const mappedPath = mappings.find((mapping) => mapping.path.test(path))

	return ((mappedPath && mappedPath.slug) ? mappedPath.slug : path)
}

async function fetchContentOnChange(pathname = '/', store) {
	const slug = pathToSlug(pathname.split('/').slice(1)).toString()
	const routes = config.allowedRoutes
	if (routes.includes(slug)) {
		await store.dispatch(actions.contentLoadContentByPageSlug(slug))
	}
}

export default fetchContentOnChange
