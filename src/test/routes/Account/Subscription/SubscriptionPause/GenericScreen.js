import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import sinon from 'sinon'
chai.use(sinonChai)

import React from 'react'
import { shallow } from 'enzyme'
import DOMPurify from 'dompurify'
import ReactMarkdown from 'react-markdown'
import GenericScreen, { renderActions } from 'routes/Account/Subscription/SubscriptionPause/GenericScreen/GenericScreen'
import CallToAction from 'routes/Account/Subscription/SubscriptionPause/CallToAction/CallToAction'
import Image from 'routes/Account/Subscription/SubscriptionPause/Image'
import TextArea from 'routes/Account/Subscription/SubscriptionPause/TextArea'

describe('Subscription Pause GenericScreen', function() {
  let wrapper

  describe('rendering', function() {
    it('should return div', function() {
      wrapper = shallow(<GenericScreen />)

      expect(wrapper.type()).to.equal('div')
    })

    it('should contain 2 divs by default', function() {
      wrapper = shallow(<GenericScreen />)

      expect(wrapper.children().length).to.equal(2)
      expect(wrapper.children().at(0).type()).to.equal('div')
      expect(wrapper.children().at(1).type()).to.equal('div')
    })

    it('should contain 1 child for each supported content item', function() {
      const content = [
        {
          type: 'copy',
          copy: 'some text',
        },
        {
          type: 'image',
        },
        {
          type: 'textarea',
        },
        {
          type: 'quote',
        },
        {
          type: 'unsupported',
        },
      ]

      wrapper = shallow(<GenericScreen content={content} />)

      expect(wrapper.children().at(0).children().length).to.equal(4)
    })

    describe('copy', function() {
      it('should render a <ReactMarkdown> if copy is provided', function() {
        const content = [
          {
            type: 'copy',
            copy: 'some text',
          },
        ]

        wrapper = shallow(<GenericScreen content={content} />)
        expect(wrapper.find(ReactMarkdown).length).to.equal(1)
      })

      it('should not render a <ReactMarkdown> if copy is not provided', function() {
        const content = [
          {
            type: 'copy',
          },
        ]

        wrapper = shallow(<GenericScreen content={content} />)
        expect(wrapper.find(ReactMarkdown).length).to.equal(0)
      })

      it('should display copy', function() {
        const content = [
          {
            type: 'copy',
            copy: 'some text',
          },
        ]

        wrapper = shallow(<GenericScreen content={content} />)
        expect(wrapper.find(ReactMarkdown).render().text()).to.equal('some text')
      })

      it('should call sanitize once for each copy', function() {
        const sanitize = sinon.spy(DOMPurify, 'sanitize')
        const content = [
          {
            type: 'copy',
            copy: 'some text',
          },
          {
            type: 'copy',
            copy: '<span>some other text</span>',
          },
        ]

        shallow(<GenericScreen content={content} />)
        expect(sanitize.callCount).to.equal(2)
        expect(sanitize.firstCall).to.be.calledWithExactly('some text')
        expect(sanitize.lastCall).to.be.calledWithExactly('<span>some other text</span>')
        sanitize.reset()
      })
    })

    describe('image', function() {
      it('should render a subscription pause <Image>', function() {
        const content = [
          {
            type: 'image',
          },
        ]

        wrapper = shallow(<GenericScreen content={content} />)
        expect(wrapper.find(Image).length).to.equal(1)
      })

      it('should pass image props to Image', function() {
        const content = [
          {
            type: 'image',
            image: {
              title: 'image title',
              urls: [],
            },
          },
        ]

        wrapper = shallow(<GenericScreen content={content} />)
        expect(wrapper.find(Image).prop('title')).to.equal('image title')
        expect(wrapper.find(Image).prop('urls')).to.deep.equal([])
      })
    })

    describe('textarea', function() {
      it('should render a subscription pause <TextArea>', function() {
        const content = [
          {
            type: 'textarea',
          },
        ]

        wrapper = shallow(<GenericScreen content={content} />)
        expect(wrapper.find(TextArea).length).to.equal(1)
      })

      it('should pass props to TextArea', function() {
        const content = [
          {
            type: 'textarea',
            placeholder: 'placeholder text',
          },
        ]

        wrapper = shallow(<GenericScreen content={content} />)
        expect(wrapper.find(TextArea).prop('placeholder')).to.equal('placeholder text')
      })
    })

    describe('quote', function() {
      it('should display a subscription pause Quote', function() {
        const content = [
          {
            type: 'quote',
          },
        ]

        wrapper = shallow(<GenericScreen content={content} />)
      })
    })

    it('should contain 1 <CallToAction /> for each action', function() {
      const actions = [
        {
          type: 'Cancel',
        },
        {
          type: 'CancelLink',
        },
      ]

      wrapper = shallow(<GenericScreen actions={actions} />)

      expect(wrapper.find(CallToAction).length).to.equal(2)
    })

    it('should contain a 3rd div with 1 <CallToAction> of type "CancelLink" when allowCancel is true', function() {
      wrapper = shallow(<GenericScreen allowCancel />)

      const cta = wrapper.children().at(2).find(CallToAction)

      expect(cta.length).to.equal(1)
      expect(cta.prop('type')).to.equal('CancelLink')
    })
  })

  describe('renderActions helper', function() {
    it('should return 1 <CallToAction /> for each action', function() {
      const firstActions = [
        {
          type: 'Cancel',
        },
        {
          type: 'CancelLink',
        },
        {
          type: 'AnythingElse',
        },
      ]

      const secondActions = [
        {
          type: 'Cancel',
        },
      ]

      const firstResult = renderActions(firstActions)
      const secondResult = renderActions(secondActions)

      expect(firstResult.length).to.equal(3)

      expect(firstResult.every(item => item.type === CallToAction)).to.equal(true)
      expect(secondResult.length).to.equal(1)
      expect(secondResult[0].type).to.equal(CallToAction)
    })

    it('should set correct type for each <CallToAction />', function() {
      const actions = [
        {
          type: 'Cancel',
        },
        {
          type: 'CancelLink',
        },
        {
          type: 'AnythingElse',
        },
      ]

      const result = renderActions(actions)

      expect(result[0].props.type).to.equal('Cancel')
      expect(result[1].props.type).to.equal('CancelLink')
      expect(result[2].props.type).to.equal('AnythingElse')
    })
  })
})
