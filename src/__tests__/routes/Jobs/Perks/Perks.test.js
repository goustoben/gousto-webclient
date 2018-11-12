import React from 'react'
import { shallow } from 'enzyme'

import PerkCircle from 'routes/Jobs/Perks/PerkCircle/PerkCircle'
import Perks from 'routes/Jobs/Perks/Perks'
import css from 'routes/Jobs/Perks/Perks.css'

describe('Perks', () => {
  test('should render 1 rows', () => {
    const wrapper = shallow(<Perks />)
    const className = `.${css.perkRow.split(' ').join('.')}`
    expect(wrapper.find(className)).toHaveLength(1)
  })
  test('should render 3 lines of copy', () => {
    const wrapper = shallow(<Perks />)
    const className = `.${css.perkCopy.split(' ').join('.')}`
    expect(wrapper.find(className)).toHaveLength(3)
  })
  test('should render a PerkCircle component with the date prop mapped through', () => {
    const wrapper = shallow(<Perks />)
    expect(wrapper.find(PerkCircle).length).toBe(1)
  })
})
