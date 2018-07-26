const blackListConfig = require('config/gtmBlacklist')

function getDataLayer(initialState, url, userAgent) {
	const menuRecipes = initialState.menuRecipes
	const menuRecipesStore = initialState.recipes
	let dataLayer = '[]'
	if (menuRecipes && url.includes('menu') && menuRecipes.size > 0) {
		const recipeData = menuRecipes.map(recipeId => menuRecipesStore.get(recipeId)).toArray().map((recipe, index) => (JSON.stringify({
			name: recipe.get('title'),
			id: recipe.get('id'),
			category: recipe.get('type'),
			list: 'This Weeks Recipes',
			position: index + 1,
		})))
		.join(',')

		dataLayer = `[{
			'ecommerce': {
				'impressions': [${recipeData}]
			}
		}]`
	}

	let gtmScript = ''
	if (!userAgent.match(blackListConfig.user_agents)) {
		gtmScript = `
			<noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-MKZ8XN"
			height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
			<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
			new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
			j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
			'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
			})(window,document,'script','dataLayer','GTM-MKZ8XN');</script>`
	}

	return (
		`<script>dataLayer = window.dataLayer || ${dataLayer};</script>${gtmScript}`
	)
}

function getDataScienceLayer(state) {
	const authId = state.auth.get('id')

	return (
		`<script>dataScienceDataLayer = [${authId ? JSON.stringify({ goustoReference: authId }) : ''}];</script>
		<noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-M59C2X"
		height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
		<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
		new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
		j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
		'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataScienceDataLayer','GTM-M59C2X');</script>`
	)
}

function gtm(initialState, url, userAgent) {
	return (
		`${getDataLayer(initialState, url, userAgent)}${getDataScienceLayer(initialState)}`
	)
}

export default gtm
