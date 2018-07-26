/* eslint-disable global-require */
import React from 'react'
import css from './TestedLoved.css'

const TestedLoved = () => (
	<div className={css.container}>
		<h2 className={css.title}>Tested and loved by</h2>
		<div className={css.logos}>
			<div className={css.logo} style={{ backgroundImage: `url(${require('./logos/telegraph.png')})` }} />
			<div className={css.logo} style={{ backgroundImage: `url(${require('./logos/buzzfeed.png')})` }} />
			<div className={css.logo} style={{ backgroundImage: `url(${require('./logos/independent.png')})` }} />
			<div className={css.fourthLogo} style={{ backgroundImage: `url(${require('./logos/now.png')})` }} />
			<div className={css.mobileSpacer} />
			<div className={css.logo} style={{ backgroundImage: `url(${require('./logos/closer.png')})` }} />
		</div>
	</div>
)

export default TestedLoved
