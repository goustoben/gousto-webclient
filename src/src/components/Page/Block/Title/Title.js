import React, { PropTypes } from 'react'
import { H1 } from 'Page/Header'
import Icon from 'Icon'

const Title = ({ children, iconAfter, iconBefore, headlineFont }) => (
  children ?
		<H1 defaults="LG" headlineFont={headlineFont}>
			{iconBefore && [
				<Icon
				  key={0}
				  name={iconBefore}
				/>,
				' ',
			]}
			{children}
			{iconAfter && [
			  ' ',
				<Icon
				  key={1}
				  name={iconAfter}
				/>,
			]}
		</H1>
    : null
)

Title.propTypes = {
  children: PropTypes.node.isRequired,
  iconAfter: PropTypes.string,
  iconBefore: PropTypes.string,
  headlineFont: PropTypes.bool,
}

Title.defaultProps = {
  headlineFont: false,
}

export default Title
