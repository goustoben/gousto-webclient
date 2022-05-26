import React from 'react'

import { shallow } from 'enzyme'

import { PasswordCriteria } from '../PasswordCriteria'

describe('Given PasswordCriteria', () => {
  let wrapper
  const passwordErrors = ['min', 'text']
  const password = '55ifuj'

  beforeEach(() => {
    wrapper = shallow(<PasswordCriteria password={password} passwordErrors={passwordErrors} />)
  })

  test('should be rendered correctly', () => {
    expect(wrapper.find('[data-testing="criteria-container"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-testing="errors-list"]').exists()).toBeTruthy()
  })
})
