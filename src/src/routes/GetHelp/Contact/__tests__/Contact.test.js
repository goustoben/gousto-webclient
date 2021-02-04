import React from 'react'
import { mount } from 'enzyme'

import { client, zendesk } from 'config/routes'

import { Item, ItemExpandable } from 'goustouicomponents'
import itemCSS from 'components/Item/Item.css'
import { ItemLink } from '../../components/ItemLink'
import { Contact } from '../Contact'

describe('<Contact />', () => {
  const content = {
    title: 'test title',
    body: 'text...',
    button1Copy: 'Done',
    chatItem: 'test chatItem',
    emailItem: 'test emailItem',
    phoneItem: 'test phoneItem',
  }

  let wrapper
  let getHelpLayout

  beforeEach(() => {
    wrapper = mount(
      <Contact content={content} />
    )
    getHelpLayout = wrapper.find('GetHelpLayout')
  })

  describe('rendering', () => {
    test('layout is rendering correctly', () => {
      const BottomBar = getHelpLayout.find('BottomFixedContentWrapper')

      expect(getHelpLayout).toHaveLength(1)
      expect(BottomBar).toHaveLength(1)
      expect(BottomBar.find('BottomButton')).toHaveLength(1)
    })

    test('GetHelpLayout has the ctaBackUrl prop set to MyGousto', () => {
      expect(getHelpLayout.prop('ctaBackUrl')).toBe(client.myGousto)
    })

    test('header is rendering correctly', () => {
      expect(getHelpLayout.prop('title')).toBe(content.title)
    })

    test('body description is redering correctly', () => {
      expect(getHelpLayout.prop('body')).toBe(content.body)
    })

    test('items are rendered', () => {
      const items = wrapper.find(Item)

      expect(items).toHaveLength(3)
      expect(items.at(0).text()).toContain('test chatItem')
      expect(items.at(1).text()).toContain('test emailItem')
      expect(items.at(2).text()).toContain('test phoneItem')
    })

    test('bottom bar button is rendering correctly', () => {
      const BottomBar = getHelpLayout.find('BottomFixedContentWrapper')
      const Button = BottomBar.find('BottomButton')

      expect(Button.text()).toContain(content.button1Copy)
    })

    describe.each([
      [null, ''],
      ['1234', '/?user_id=1234']
    ])('when the userIdProp is %s', (userId, urlQueryParam) => {
      beforeEach(() => {
        wrapper.setProps({ userId })
      })

      test(`the email link is the zendesk email form plus: "${urlQueryParam}"`, () => {
        const linkTo = wrapper.find(ItemLink).find('a').prop('href')

        expect(linkTo).toBe(`${zendesk.emailForm}${urlQueryParam}`)
      })
    })

    describe('when orderId is passed', () => {
      const DUMMY_ORDER = '12345'

      beforeEach(() => {
        wrapper.setProps({ orderId: DUMMY_ORDER })
      })

      test('GetHelpLayout has the ctaBackUrl prop set to main SSR page', () => {
        expect(wrapper.find('GetHelpLayout').prop('ctaBackUrl')).toBe(`${client.getHelp.index}?orderId=${DUMMY_ORDER}`)
      })
    })
  })

  describe('behaviour', () => {
    test('live chat opens the chat when clicked', () => {
      const openLiveChatSpy = jest.fn()
      const chatItemContent = wrapper.find(Item).at(0).find(`.${itemCSS.itemContent}`)
      window.$zopim = {
        livechat: {
          window: {
            show: openLiveChatSpy,
          },
        },
      }
      chatItemContent.simulate('click')

      expect(openLiveChatSpy).toHaveBeenCalledTimes(1)
    })

    test('phone number is shown when phone item is clicked', () => {
      const phoneItem = wrapper.find(ItemExpandable)
      phoneItem.simulate('click')

      expect(phoneItem.text()).toContain('test phoneItem')
    })
  })
})
