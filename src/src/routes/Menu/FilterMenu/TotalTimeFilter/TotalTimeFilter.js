import PropTypes from 'prop-types'
import React from 'react'
import Content from 'containers/Content'

import { H2 } from 'components/Page/Header'
import FilterItem from 'routes/Menu/FilterMenu/FilterItem'

const TotalTimeFilter = ({ totalTimeFilters, totalTimeSelected, filterCurrentTotalTimeChange }) => (
  <div>
    <H2 size="XL2" headlineFont={false}>
      <Content contentKeys="filterTotalTimeTitle">
        <span>Total time</span>
      </Content>
    </H2>
    {Object.keys(totalTimeFilters).map((index) => {
      const totalTimeFilter = totalTimeFilters[index]

      return (
        <FilterItem
          type="radio"
          key={index}
          groupName="totalTimeFilter"
          value={totalTimeFilter}
          identifier={`totalTimeFilter-${index}`}
          checked={totalTimeSelected === index}
          onClick={() => { filterCurrentTotalTimeChange(index) }}
        >
          <span>{totalTimeFilter}</span>
        </FilterItem>
      )
    })
    }
  </div>
)

TotalTimeFilter.propTypes = {
  totalTimeFilters: PropTypes.object,
  totalTimeSelected: PropTypes.string,
  filterCurrentTotalTimeChange: PropTypes.func,
}

TotalTimeFilter.defaultProps = {
  filterCurrentTotalTimeChange: () => {
    // default function
  },
}

export default TotalTimeFilter
