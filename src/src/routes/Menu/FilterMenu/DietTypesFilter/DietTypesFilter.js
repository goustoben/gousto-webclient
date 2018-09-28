import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import Content from 'containers/Content'

import { H2 } from 'components/Page/Header'
import FilterItem from 'routes/Menu/FilterMenu/FilterItem'

const DietTypesFilter = ({ dietTypes, dietTypesFilters, filterCurrentDietTypesChange }) => (
	<div>
		<H2 size="XL2" headlineFont={false}>
			<Content contentKeys="filterRecipeTypeTitle">
				<span>Recipe type</span>
			</Content>
		</H2>
		{Object.keys(dietTypesFilters).map((dietTypeKey, index) => {
			const dietTypeFilter = dietTypesFilters[dietTypeKey]
			const isChecked = !!dietTypes.has(dietTypeKey)

			return (
				<FilterItem
					type="checkbox"
					key={index}
					groupName="dietTypes"
					value={dietTypeFilter}
					identifier={`dietType-${index}`}
					checked={isChecked}
					onClick={() => { filterCurrentDietTypesChange(dietTypeKey) }}
				>
					<span>{dietTypeFilter}</span>
				</FilterItem>
			)
		})
		}
	</div>
)

DietTypesFilter.propTypes = {
	dietTypes: PropTypes.instanceOf(Immutable.Set),
	dietTypesFilters: PropTypes.object,
	filterCurrentDietTypesChange: PropTypes.func,
}

DietTypesFilter.defaultProps = {
	filterCurrentDietTypesChange: () => {
		// default function
	},
}

export default DietTypesFilter
