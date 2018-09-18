import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

import Footer from '../Footer'

describe('Order Skip Recovery Footer', () => {
    const mockKeepOrder = jest.fn()
    const mockSkipOrder = jest.fn()
    let callToActions

    beforeEach(() => {
        callToActions = {
            keep: 'keep',
            confirm: 'confirm',
        }
    })
    describe('Initial Render', () => {
        let wrapper

        beforeAll(() => {
            wrapper = mount(
                <Footer orderType="pending" callToActions={callToActions} onClickKeepOrder={mockKeepOrder} onClickSkipCancel={mockSkipOrder} />
            )
        })

        test('should render snapshot', () => {
            const tree = renderer.create(
                <Footer onClickKeepOrder={mockKeepOrder} onClickSkipCancel={mockSkipOrder} />
            ).toJSON()

			expect(tree).toMatchSnapshot()
        })

        test('should display keep button', () => {
            const keepBtn = wrapper.find('button.keepButton')

            expect(keepBtn.length).toBe(1)
            expect(keepBtn.text()).toBe('Keep Box')
        })

        test('should display skip button', () => {
            const skipBtn = wrapper.find('div.skipAnyWay')

            expect(skipBtn.length).toBe(1)
            expect(skipBtn.text()).toBe('Cancel anyway')
        })
    })

    describe('Alternative Render', () => {

    })

    describe.skip('Functionality', () => {
        let wrapper

        beforeAll(() => {
            wrapper = mount(
                <Footer orderType="pending" callToActions={callToActions} onClickKeepOrder={mockKeepOrder} onClickSkipCancel={mockSkipOrder} />
            )
        })

        test('should fire keep order click event', () => {
            const keepBtn = wrapper.find('button.keepButton')

            keepBtn.simulate('click')

            expect(mockKeepOrder).toHaveBeenCalledTimes(1)
        })

        test('should fire skip order click event', () => {
            const skipBtn = wrapper.find('div.skipAnyWay')

            skipBtn.simulate('click')

            expect(mockSkipOrder).toHaveBeenCalledTimes(1)
        })
    })
})
