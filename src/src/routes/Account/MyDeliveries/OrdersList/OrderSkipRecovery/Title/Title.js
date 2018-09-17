import React from 'react'

import { ModalTitle } from 'ModalComponent'

import css from './Title'

const Title = ({ title, orderType }) => (
	(title) ? (
		<ModalTitle>
			<div className={css.title}>
				{title}
			</div>
		</ModalTitle>
	) : (
		<ModalTitle>
			<div className={css.title}>Are you sure you want to {(orderType === 'pending') ? 'cancel' : 'skip'}?</div>
		</ModalTitle>
	)
)

export default Title
