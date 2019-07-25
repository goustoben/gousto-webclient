import React from 'react'
import { shallow } from 'enzyme'
import config from 'config/jobs'
import PerkCircle from 'routes/Jobs/Perks/PerkCircle/PerkCircle'

describe('the PerkCircle component', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<PerkCircle />)
  })

  test('should render The perk flex container', () => {
    expect(wrapper.find('.flexContainer')).toHaveLength(1)
  })

  test('it should display all the perks', () => {
    const numberOfPerks = config.Perks.length
    expect(wrapper.find('Perk')).toHaveLength(numberOfPerks)
  })
})
