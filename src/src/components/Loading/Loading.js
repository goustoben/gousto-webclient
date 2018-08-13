import React from 'react'
import { Div } from 'Page/Elements'
import Image from 'Image'
import css from './Loading.css'

const getImage = (fileName) => require(`media/images/${fileName}`) // eslint-disable-line global-require

const Loading = () => (
	<Image media={getImage('Loading-Icon.gif')} title="animation" className={css.gif} />
)

export const LoadingOverlay = () => (
	<Div
		fixed
		w-100
		style={{ zIndex: 100, top: 0, left: 0 }}
	>
		<Div
			d-block
			margin={{
				top: 'XXL',
				right: 'auto',
				left: 'auto',
			}}
			style={{
				width: '100px',
				pointerEvents: 'none',
			}}
		>
			<Loading />
		</Div>
	</Div>
)

export default Loading
