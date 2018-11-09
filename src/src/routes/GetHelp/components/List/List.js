import React from 'react'
import classnames from 'classnames'

import css from './List.css'

const List = ({ children }) => (
		<ul className={css.list}>
			{React.Children.map(children, (child) => (
					<li className={classnames(
					  css.item,
					  { [css.hiddenOnMobile]: child.props.isHiddenOnMobile })}
					>
						{child}
					</li>
			)
			)}
		</ul>
)

export {
  List
}
