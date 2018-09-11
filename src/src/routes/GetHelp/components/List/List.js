import React from 'react'

import css from './List.css'

const List = ({ children }) => (
	<ul className={css.list}>
		{children}
	</ul>
)

export default List
