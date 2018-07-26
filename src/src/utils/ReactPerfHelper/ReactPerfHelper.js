import React from 'react'
import Perf from 'react-addons-perf'
import logger from 'utils/logger'
import css from './ReactPerfHelper.css'

class ReactPerfHelper extends React.PureComponent {

	constructor() {
		super()

		this.state = {
			show: false,
		}
	}

	componentDidMount() {
		if (typeof window !== 'undefined') {
			window.Perf = Perf
		}
	}

	static start() {
		logger.debug('%c Recording actions...', 'background: #2F2826; color: white;')
		Perf.start()
	}

	static stop() {
		Perf.stop()
		logger.debug('%c Recording stopped', 'background: #D36148; color: white;')
	}

	static printWasted() {
		Perf.printWasted()
	}

	toggleMenu() {
		this.setState({ show: !this.state.show })
	}

	render() {
		return (
			<div className={css.fixed}>
				<button className={this.state.show ? css.buttonMinus : css.buttonPlus} onClick={() => this.toggleMenu()}></button>
				{this.state.show ? <button className={css.start} onClick={() => ReactPerfHelper.start()}>start</button> : null}
				{this.state.show ? <button className={css.stop} onClick={() => ReactPerfHelper.stop()}>stop</button> : null}
				{this.state.show ? <button className={css.print} onClick={() => ReactPerfHelper.printWasted()}>Print wasted</button> : null}
			</div>
		)
	}
}

export default ReactPerfHelper
