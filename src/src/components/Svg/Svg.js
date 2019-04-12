import PropTypes from 'prop-types'
import React from 'react'
import css from './Svg.css'

class Svg extends React.Component {
  static propTypes = {
    fileName: PropTypes.string,
    className: PropTypes.string,
  }

  static defaultProps = {
    fileName: '',
    className: '',
  }

  render() {
    const svgUrl = require(`media/svgs/${this.props.fileName}.svg`) // eslint-disable-line global-require

    return (
      <div className={`${css.svg} ${this.props.fileName} ${this.props.className}`} style={{ backgroundImage: `url(${svgUrl})` }} />
    )
  }
}

export default Svg
