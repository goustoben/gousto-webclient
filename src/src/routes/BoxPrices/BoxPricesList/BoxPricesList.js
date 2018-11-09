import React, { PropTypes } from 'react'
import groupBy from 'lodash.groupby'

import BoxPrice from '../BoxPrice'
import css from './BoxPriceList.css'
import withError from 'utils/withError'

const BoxPricesList = ({ boxPrices, type }) => {
  const boxTypes = boxPrices[type]
  const groupByNumPerson = groupBy(boxTypes, 'num_persons')

  return (
		<div className={css.boxPriceList}>
			{Object.keys(groupByNumPerson)
			  .filter(numPersons => numPersons !== '8')
			  .map((numPersons) => (
					<BoxPrice
					  key={`box-type-${numPersons}`}
					  numPersons={parseInt(numPersons, 10)}
					  boxInfo={groupByNumPerson[numPersons]}
					/>
			  )
			  )}
		</div>
  )
}

BoxPricesList.propTypes = {
  boxPrices: PropTypes.object,
  type: PropTypes.oneOf(['gourmet', 'vegetarian']),
}

export default withError(BoxPricesList)
