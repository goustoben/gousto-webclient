import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'

import ModuleHeader from 'components/ModuleHeader'
import { P } from 'components/Page/Elements'
import Panel from 'components/Guide/Panel'

import GuideOriginal from 'components/Guide'

describe('Guide', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<GuideOriginal />)
  })

  describe('rendering', () => {
    test('should return a div with no props', () => {
      expect(wrapper.type()).toEqual('div')
    })

    test('should render 1 <ModuleHeader> component(s)', () => {
      expect(wrapper.find(ModuleHeader).length).toEqual(1)
    })

    test('should render 1 <P> component(s)', () => {
      expect(wrapper.find(P).length).toEqual(1)
    })

    test('should render 3 <Panel> component(s)', () => {
      const steps = [
        {
          path: 'icon-choose',
          title: 'You choose',
          description:
						'From over 20 recipes a week. You can pause or skip boxes whenever you like.',
        },
        {
          path: 'icon-pause',
          title: 'We deliver',
          description:
						'Perfectly measured ingredients, any day of the week (to fit in with your life).',
        },
        {
          path: 'icon-no-problem',
          title: 'You cook',
          description:
						'Tasty, impressive meals you’re proud to share with the people you love.',
        },
      ]

      wrapper = shallow(<GuideOriginal steps={steps} />)

      expect(wrapper.find(Panel)).toHaveLength(3)
    })
  })
})
