import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

import Footer from '../Footer'

describe('Order Skip Recovery Modal Footer', () => {
    const mockKeepOrder = jest.fn()
    const mockSkipOrder = jest.fn()

    describe('Initial Render', () => {
        let wrapper

        beforeAll(() => {
            wrapper = mount(
                <Footer onClickKeepOrder={mockKeepOrder} onClickSkipCancel={mockSkipOrder} />
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
            expect(skipBtn.text()).toBe('Skip anyway')
        })
    })

    describe('Alternative Render', () => {
        test('should render "Cancel" instead "Skip" as skip button copy', () => {
            const wrapper = mount(
                <Footer orderType="pendinng" onClickKeepOrder={mockKeepOrder} onClickSkipCancel={mockSkipOrder} />
            )

            const skipBtn = wrapper.find('div.skipAnyWay')

            expect(skipBtn.text()).toBe('Skip anyway')
        })

        test('should render custom keep button copy', () => {
            const callToActions = {
                keep: 'foo',
                confirm: 'bar',
            }

            const wrapper = mount(
                <Footer callToActions={callToActions} onClickKeepOrder={mockKeepOrder} onClickSkipCancel={mockSkipOrder} />
            )

            const keepBtn = wrapper.find('button.keepButton')

            expect(keepBtn.text()).toBe('foo')
        })

        test('should render custom skip button copy', () => {
            const callToActions = {
                keep: 'foo',
                confirm: 'bar',
            }

            const wrapper = mount(
                <Footer callToActions={callToActions} onClickKeepOrder={mockKeepOrder} onClickSkipCancel={mockSkipOrder} />
            )

            const skipBtn = wrapper.find('div.skipAnyWay')

            expect(skipBtn.text()).toBe('bar')
        })

        test('should priorities callToActions over orderType', () => {
            const callToActions = {
                keep: 'foo',
                confirm: 'bar',
            }

            const wrapper = mount(
                <Footer orderType="pendinng" callToActions={callToActions} onClickKeepOrder={mockKeepOrder} onClickSkipCancel={mockSkipOrder} />
            )

            const keepBtn = wrapper.find('button.keepButton')
            const skipBtn = wrapper.find('div.skipAnyWay')

            expect(keepBtn.text()).toBe('foo')
            expect(skipBtn.text()).toBe('bar')
        })
    })

    describe('Functionality', () => {
        let wrapper

        beforeAll(() => {
            wrapper = mount(
                <Footer onClickKeepOrder={mockKeepOrder} onClickSkipCancel={mockSkipOrder} />
            )
        })

        test('should fire keep order click event', () => {
            const keepBtn = wrapper.find('.keepButton')

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
