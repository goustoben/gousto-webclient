import React from 'react'
import { mount } from 'enzyme'
import { Grid } from '../Grid.logic'

const Column = () => (<div />)

describe('Grid', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(
      <Grid>
        <Column />
      </Grid>,
    )
  })

  test('renders without crashing', () => {})

  test('renders children', () => {
    expect(wrapper.find('Column').exists()).toBeTruthy()
  })
})
