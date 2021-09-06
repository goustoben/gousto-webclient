import React from 'react'
import { mount } from 'enzyme'
import { client } from '../../../../../config/routes'
import { GetHelpFAQ } from '../GetHelpFAQ'

describe('GetHelpFAQ', () => {
  const MISSING_INGREDIENTS_ID = '3'
  const WRONG_INGREDIENTS_ID = '4'
  const DAMAGED_INGREDIENTS_ID = '22'
  const INGREDIENT_QUALITY_ID = '13'

  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <GetHelpFAQ issuesIDs={['2','3','4']} />
    )
  })

  test('renders without crashing', () => {})

  describe('when I click the "Where can I view my credit?" section', () => {
    beforeEach(() => {
      wrapper.find('Card').at(0).find('Item').simulate('click')
    })

    test('the expanded content has a link pointing to My Details', () => {
      const link = wrapper.find('Card').at(0).find('GoustoLink')

      expect(link.prop('to')).toBe(client.myDetails)
      expect(link.prop('clientRouted')).toBe(false)
      expect(link.text()).toBe('Account Details')
    })
  })

  describe('when none of the issueIDs match known issues', () => {
    beforeEach(() => {
      wrapper.setProps({ issuesIDs: ['potato', 'red', 'BATMAN']})
    })

    test('does not render the "What happens next with my feedback?" section', () => {
      expect(wrapper.find('Card').length).toBe(1)
    })
  })

  describe('when some or all of issueIDs match known issues', () => {
    describe('and the one matching is for missing ingredients', () => {
      beforeEach(() => {
        wrapper.setProps({ issuesIDs: ['potato', 'red', MISSING_INGREDIENTS_ID]})

        // opening all ItemExpandable so the content renders
        wrapper.find('[role="button"]').forEach((item) => item.simulate('click'))
      })

      test('renders the "What happens next with my feedback?" section', () => {
        expect(wrapper.find('Card').length).toBe(2)
      })

      test('renders the content needed for missing ingredients', () => {
        expect(wrapper.find('Card').at(1).text()).toContain('For missing and wrong ingredients')
      })

      test('does not render the content for other issues', () => {
        expect(wrapper.find('Card').at(1).text()).not.toContain('For low quality ingredients')
        expect(wrapper.find('Card').at(1).text()).not.toContain('For damaged ingredients')
      })
    })

    describe('and the one matching is for wrong ingredients', () => {
      beforeEach(() => {
        wrapper.setProps({ issuesIDs: ['potato', 'red', WRONG_INGREDIENTS_ID]})

        // opening all ItemExpandable so the content renders
        wrapper.find('[role="button"]').forEach((item) => item.simulate('click'))
      })

      test('renders the "What happens next with my feedback?" section', () => {
        expect(wrapper.find('Card').length).toBe(2)
      })

      test('renders the content needed for wrong ingredients', () => {
        expect(wrapper.find('Card').at(1).text()).toContain('For missing and wrong ingredients')
      })

      test('does not render the content for other issues', () => {
        expect(wrapper.find('Card').at(1).text()).not.toContain('For low quality ingredients')
        expect(wrapper.find('Card').at(1).text()).not.toContain('For damaged ingredients')
      })
    })

    describe('and the one matching is for damaged ingredients', () => {
      beforeEach(() => {
        wrapper.setProps({ issuesIDs: ['potato', 'red', DAMAGED_INGREDIENTS_ID]})

        // opening all ItemExpandable so the content renders
        wrapper.find('[role="button"]').forEach((item) => item.simulate('click'))
      })

      test('renders the "What happens next with my feedback?" section', () => {
        expect(wrapper.find('Card').length).toBe(2)
      })

      test('renders the content needed for damaged ingredients', () => {
        expect(wrapper.find('Card').at(1).text()).toContain('For damaged ingredients')
      })

      test('does not render the content for other issues', () => {
        expect(wrapper.find('Card').at(1).text()).not.toContain('For low quality ingredients')
        expect(wrapper.find('Card').at(1).text()).not.toContain('For missing and wrong ingredients')
      })
    })

    describe('and the one matching is for ingredient quality', () => {
      beforeEach(() => {
        wrapper.setProps({ issuesIDs: ['potato', 'red', INGREDIENT_QUALITY_ID]})

        // opening all ItemExpandable so the content renders
        wrapper.find('[role="button"]').forEach((item) => item.simulate('click'))
      })

      test('renders the "What happens next with my feedback?" section', () => {
        expect(wrapper.find('Card').length).toBe(2)
      })

      test('renders the content needed for low quality ingredients', () => {
        expect(wrapper.find('Card').at(1).text()).toContain('For low quality ingredients')
      })

      test('does not render the content for other issues', () => {
        expect(wrapper.find('Card').at(1).text()).not.toContain('For damaged ingredients')
        expect(wrapper.find('Card').at(1).text()).not.toContain('For missing and wrong ingredients')
      })
    })
  })

  describe('when clicking on an item', () => {
    const trackClickFn = jest.fn()

    beforeEach(() => {
      // getting the 2nd item to show
      wrapper.setProps({ issuesIDs: [MISSING_INGREDIENTS_ID], onClick: trackClickFn})

      // opening all ItemExpandable so the content renders
      wrapper.find('[role="button"]').forEach((item) => item.simulate('click'))
    })

    test('calls the onClick function with the name of the article', () => {
      expect(trackClickFn).toHaveBeenCalledTimes(2)
      expect(trackClickFn).toHaveBeenCalledWith('Where can I view my credit?')
      expect(trackClickFn).toHaveBeenCalledWith('What happens next with my feedback?')
    })
  })
})
