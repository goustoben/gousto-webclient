import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import { Experiments } from './Experiments'

describe('Experiments', () => {
  let wrapper
  let children
  let experiment
  let fetchOrAssignUserToExperiment

  beforeEach(() => {
    children = jest.fn(() => <h1>Foo</h1>)
    fetchOrAssignUserToExperiment = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('When component renders', () => {
    describe('When there is no experiment', () => {
      beforeEach(() => {
        experiment = null
      })

      describe('when children is passed as a prop', () => {
        beforeEach(() => {
          wrapper = shallow(
            <Experiments
              experimentName="mock-experiment"
              experiment={experiment}
              isFetchingExperiments={false}
              fetchOrAssignUserToExperiment={fetchOrAssignUserToExperiment}
            >
              {children}
            </Experiments>
          )
        })

        test('calls children() with the null as an argument', () => {
          expect(children).toHaveBeenCalledWith(null)
        })

        test('returns the result of children', () => {
          expect(wrapper.getElement()).toEqual(<h1>Foo</h1>)
        })
      })

      describe('when children is not passed as a prop', () => {
        beforeEach(() => {
          wrapper = shallow(
            <Experiments
              experimentName="mock-experiment"
              experiment={experiment}
              isFetchingExperiments={false}
              fetchOrAssignUserToExperiment={fetchOrAssignUserToExperiment}
            />
          )
        })

        test('renders null', () => {
          expect(wrapper.getElement()).toEqual(null)
        })
      })
    })

    describe('When there is an experiment', () => {
      beforeEach(() => {
        experiment = Immutable.Map({
          name: 'mock-experiment',
          bucket: 'control',
          withinExperiment: true
        })

        wrapper = shallow(
          <Experiments
            experimentName="mock-experiment"
            experiment={experiment}
            isFetchingExperiments={false}
            fetchOrAssignUserToExperiment={fetchOrAssignUserToExperiment}
          >
            {children}
          </Experiments>
        )
      })

      describe('When children is passed as a prop', () => {
        test('calls children() with the experiment as an argument', () => {
          expect(children).toHaveBeenCalledWith(experiment)
        })
      })
    })
  })

  describe('When the component mounts', () => {
    describe('Given there is no experiment for a user and currently not fetching experiments', () => {
      beforeEach(() => {
        wrapper = shallow(
          <Experiments
            experimentName="mock-experiment"
            isFetchingExperiments={false}
            fetchOrAssignUserToExperiment={fetchOrAssignUserToExperiment}
          />
        )
      })

      test('assigns user to an experiment', () => {
        expect(fetchOrAssignUserToExperiment).toHaveBeenCalledWith('mock-experiment')
      })
    })

    describe('Given the component updates', () => {
      beforeEach(() => {
        wrapper = shallow(
          <Experiments
            experimentName="mock-experiment"
            experiment={experiment}
            isFetchingExperiments={false}
            fetchOrAssignUserToExperiment={fetchOrAssignUserToExperiment}
          />
        )
      })

      describe('Given isFetchingExperiments is false and user is not assigned to the experiment', () => {
        beforeEach(() => {
          wrapper.setProps({
            isFetchingExperiments: false,
            experiment: null
          })
        })

        test('assigns user to an experiment', () => {
          expect(fetchOrAssignUserToExperiment).toHaveBeenCalledWith('mock-experiment')
        })
      })

      describe('Given experiment and isFetching do no change', () => {
        beforeEach(() => {
          wrapper = shallow(
            <Experiments
              experimentName="mock-experiment"
              experiment={experiment}
              isFetchingExperiments={false}
              fetchOrAssignUserToExperiment={fetchOrAssignUserToExperiment}
            />
          )
        })

        test('does not assign user to an experiment', () => {
          fetchOrAssignUserToExperiment.mockClear()

          wrapper.setProps()

          expect(fetchOrAssignUserToExperiment).not.toHaveBeenCalled()
        })
      })
    })
  })
})
