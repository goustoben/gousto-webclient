import React from 'react'

const withScroll = ({ propName, height }) => (Component) =>
	class WithScroll extends React.Component {

		constructor(props) {
			super(props)
			this.state = {
				scrolledPastPoint: false,
			}
			this.ticking = false
		}

		scrollListener = () => {
			// Polyfill for different browser requestAnimationFrame API
			const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
				window.webkitRequestAnimationFrame || window.msRequestAnimationFrame

			const lastKnownScrollPosition = window.scrollY

			if (!this.ticking) {
				this.requestAnimationFrame = requestAnimationFrame(() => {
					const scrolledPastPoint = height < lastKnownScrollPosition
					this.setState({
						scrolledPastPoint,
					})
					this.ticking = false
				})
				this.ticking = true
			}
		}

		componentDidMount() {
			window.addEventListener('scroll', this.scrollListener)
		}

		componentWillUnmount() {
			const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame
			window.removeEventListener('scroll', this.scrollListener)
			cancelAnimationFrame(this.requestAnimationFrame)
		}

		render() {
			const scrollProp = { [propName || 'scrolledPastPoint']: this.state.scrolledPastPoint }

			return <Component {...this.props} {...scrollProp } />
		}
	}

export default withScroll
