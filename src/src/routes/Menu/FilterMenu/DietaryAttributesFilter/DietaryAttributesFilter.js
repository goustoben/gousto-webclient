import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import Content from 'containers/Content'

import { H2 } from 'components/Page/Header'
import FilterItem from 'routes/Menu/FilterMenu/FilterItem'

const DietaryAttributesFilter = ({
	dietaryAttributes,
	dietaryAttributeTypes,
	filterDietaryAttributesChange,
}) => (
	<div>
		<H2 size="XL2" headlineFont={false}>
			<Content contentKeys="filterRecipeDietaryAttributesTitle">
				<span>Free From</span>
			</Content>
		</H2>
		{(Object.entries(dietaryAttributeTypes)).map(([dietaryAttributeType, dietaryAttributeName]) => {
			const isChecked = dietaryAttributes.has(dietaryAttributeType)

			return (
				<FilterItem
					type="checkbox"
					key={`dietaryAttribute-${dietaryAttributeType}`}
					groupName="dietaryAttributes"
					value={dietaryAttributeType}
					identifier={`dietaryAttribute-${dietaryAttributeType}`}
					checked={isChecked}
					onClick={() => filterDietaryAttributesChange(dietaryAttributeType)}
				><span>{dietaryAttributeName}</span>
				</FilterItem>
			)
		})}
	</div>
)

DietaryAttributesFilter.propTypes = {
	dietaryAttributes: PropTypes.instanceOf(Immutable.Set),
	dietaryAttributeTypes: PropTypes.object,
	filterDietaryAttributesChange: PropTypes.func,
}

DietaryAttributesFilter.defaultProps = {
	dietaryAttributes: Immutable.Set([]),
	dietaryAttributeTypes: {},
}

export default DietaryAttributesFilter
