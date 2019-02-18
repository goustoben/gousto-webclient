import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

import css from './Address.css'

class Address extends React.PureComponent {
	static propTypes = {
	  addressName: PropTypes.string,
	  address: PropTypes.string,
	  town: PropTypes.string,
	  postcode: PropTypes.string,
	  isSelected: PropTypes.bool,
	  addressId: PropTypes.string,
	  selectAddress: PropTypes.func,
	}

	static defaultProps = {
	  addressName: '',
	  address: '',
	  town: '',
	  postcode: '',
	  isSelected: false,
	}

	static contextTypes = {
	  store: PropTypes.object.isRequired,
	}

	onClick = (addressId) => {
	  this.props.selectAddress(addressId)
	}

	render() {
	  const { isSelected } = this.props

	  return (
			<div className={css.deliveryContainer}>
				<div className={css.checkbox}>
					<div
					  className={
					    classnames(
					      [css.square],
					      { [css.cantClick]: isSelected })
					  }
					  onClick={!isSelected ? () => this.onClick(this.props.addressId) : null}
					>
						{isSelected ? <div className={css.tick}></div> : null}
					</div>
				</div>
				<div className={css.addressContainer}>
					<p className={css.name}>{this.props.addressName}</p>
					<p>{this.props.address}, {this.props.town}, {this.props.postcode}</p>
				</div>
			</div>
	  )
	}
}

export default Address
