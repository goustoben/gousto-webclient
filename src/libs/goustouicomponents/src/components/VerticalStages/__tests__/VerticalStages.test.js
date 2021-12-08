import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import { VerticalStages } from '../index'
import { VerticalStagesItem } from '../../VerticalStagesItem'
import { headingAvailableTypes } from '../../Heading/Heading.logic'

describe('VerticalStages', () => {
  let wrapper
  const CHILDREN = [
    {
      backgroundColor: 'transparent',
      isCompleted: false,
      title: 'This is a title',
    },
    {
      backgroundColor: 'lightGrey',
      isCompleted: true,
      title: 'This is another title',
    },
  ]

  const renderWrapper = (hasFullWidth) => {
    const verticalStagesProps = {
      hasFullWidth,
      headingType: headingAvailableTypes[0],
    }

    return (
      <VerticalStages {...verticalStagesProps}>
        {
          CHILDREN.map((title, index) => {
            const CHILD = CHILDREN[index]

            return (
              <VerticalStagesItem
                backgroundColor={CHILD.backgroundColor}
                headingType={headingAvailableTypes[0]}
                isCompleted={CHILD.isCompleted}
                key={CHILD.title}
                title={CHILD.title}
                hasFullWidth={false}
                isLastStep={false}
                stepNumber={index + 1}
              />
            )
          })
        }
      </VerticalStages>
    )
  }

  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(renderWrapper(false), div)
  })

  beforeEach(() => {
    wrapper = mount(renderWrapper(false))
  })

  test('passes the isCompleted prop from VerticalStagesItem', () => {
    wrapper.find('verticalStagesWrapper').forEach((itemWrapper, index) => {
      const CHILD = CHILDREN[index]

      expect(itemWrapper.prop('isCompleted')).toBe(CHILD.isCompleted)
    })
  })

  test('passes the backgroundColor prop to VerticalStagesItem', () => {
    wrapper.find('verticalStagesWrapper').forEach((itemWrapper, index) => {
      const CHILD = CHILDREN[index]

      expect(itemWrapper.prop('backgroundColor')).toBe(CHILD.backgroundColor)
    })
  })

  test('passes the index from the map to VerticalStagesItem', () => {
    wrapper.find('verticalStagesWrapper').forEach((itemWrapper, index) => {
      expect(itemWrapper.prop('stepNumber')).toBe(index + 1)
    })
  })

  describe('when the headingType prop is passed', () => {
    test('passes the prop to each VerticalStagesItem', () => {
      headingAvailableTypes.forEach((headingType) => {
        wrapper.setProps({ headingType })

        wrapper.find('VerticalStagesItem').forEach((item) => {
          expect(item.prop('headingType')).toBe(headingType)
        })
      })
    })
  })

  describe('when hasFullWidth is set to true', () => {
    beforeEach(() => {
      wrapper = mount(renderWrapper(true))
    })

    test('set hasFullWidth flag only for its last VerticalStagesItem', () => {
      const CHILD1 = CHILDREN[0]
      const CHILD2 = CHILDREN[CHILDREN.length - 1]

      expect(wrapper.find(CHILD1).prop('hasFullWidth')).toBe(false)
      expect(wrapper.find(CHILD2).prop('hasFullWidth')).toBe(true)
    })
  })
})
