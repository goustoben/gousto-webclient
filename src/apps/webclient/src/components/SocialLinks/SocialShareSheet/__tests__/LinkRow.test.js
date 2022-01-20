import React from 'react'
import { shallow } from 'enzyme'
import { LinkRow } from '../LinkRow'

import { SOCIAL_TYPES } from '../../socialReferralHelper'

describe('LinkRow', () => {
  let wrapper

  const onClick = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <LinkRow svgName="icon-text-message-colour" rowName={SOCIAL_TYPES.text} onClick={onClick} />
    )
  })

  test('renders correctly', () => {
    expect(wrapper.find('Svg').props()).toMatchObject({
      fileName: 'icon-text-message-colour',
      className: 'icon',
      label: '',
      hidden: false,
    })

    expect(wrapper.find('span').text()).toBe('Text Message')
  })

  describe('when clicked', () => {
    beforeEach(() => {
      wrapper.simulate('click')
    })

    test('then it should invoke onClick', () => {
      expect(onClick).toHaveBeenCalled()
    })
  })
})
