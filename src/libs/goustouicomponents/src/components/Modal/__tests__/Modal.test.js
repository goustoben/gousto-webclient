import React from 'react'
import { mount } from 'enzyme'
import { Modal } from '..'

const mockProps = {
  isOpen: true,
  children: <div />,
  description: 'mock description',
  name: 'mock-name',
  onRequestClose: () => { },
  handleClose: () => { },
  withOverlay: false,
}

let wrapper
const mockOnRequestClose = jest.fn()
const mockHandleClose = jest.fn()

describe('Given the <Modal> component is used', () => {
  describe('When the user clicks the close icon', () => {
    beforeEach(() => {
      jest.resetAllMocks()

      class MockModalParent extends React.Component {
        constructor(props) {
          super(props)

          this.state = {
            isModalOpen: true,
          }
        }

        closeModal() {
          mockHandleClose()
          this.setState({ isModalOpen: false })
        }

        render() {
          const { isModalOpen } = this.state

          return (
            <Modal
              {...this.props}
              isOpen={isModalOpen}
              onRequestClose={mockOnRequestClose}
              handleClose={() => this.closeModal()}
            >
              Some modal content
            </Modal>
          )
        }
      }

      wrapper = mount(
        <MockModalParent {...mockProps} onRequestClose={mockOnRequestClose} />,
      )

      wrapper.find('[data-testing="modal-close-button"]').simulate('click')
    })

    test('then the "onRequestClose" prop is invoked', () => {
      expect(mockOnRequestClose).toHaveBeenCalledTimes(1)
    })

    test('then the "handleClose" prop is invoked', () => {
      expect(mockHandleClose).toHaveBeenCalledTimes(1)
    })
  })

  describe('When a screen reader is used', () => {
    beforeEach(() => {
      wrapper = mount(<Modal {...mockProps} />)
    })

    test('Then the <Modal> should render the expected "aria-labelledby" attribute', () => {
      expect(wrapper.exists('[aria-labelledby="mock-name"]')).toEqual(true)
    })

    test('Then the <Modal> should render the expected "aria-describedby" attribute', () => {
      expect(wrapper.exists('[aria-describedby="mock description"]')).toEqual(
        true,
      )
    })
  })

  describe('When "isOpen" prop is true', () => {
    beforeEach(() => {
      wrapper = mount(<Modal {...mockProps} isOpen />)
    })

    test('Then the <Modal> is rendered', () => {
      expect(wrapper.exists('[data-testing="mock-name-modal"]')).toEqual(true)
    })

    describe('And withOverlay prop is true', () => {
      beforeEach(() => {
        wrapper = mount(<Modal {...mockProps} isOpen withOverlay />)
      })

      test('Then the overlay is rendered', () => {
        expect(
          wrapper.find('[data-testing="modal-overlay"]').exists(),
        ).toBeTruthy()
      })
    })

    describe('When I click outside of the modal', () => {
      let onMouseDown

      beforeEach(() => {
        jest
          .spyOn(document, 'addEventListener')
          .mockImplementation((e, cb) => {
            onMouseDown = cb
          })

        wrapper = mount(<Modal {...mockProps} isOpen />)

        onMouseDown({ current: { contains: () => false } })
      })

      test('Then handleClose prop is invoked', () => {
        expect(mockHandleClose).toHaveBeenCalledTimes(1)
      })
    })

    describe('And withOverlay prop is false', () => {
      test('Then the overlay is not rendered', () => {
        expect(
          wrapper.find('[data-testing="modal-overlay"]').exists(),
        ).toBeFalsy()
      })
    })
  })

  describe('When "isOpen" prop is false', () => {
    beforeEach(() => {
      wrapper = mount(<Modal {...mockProps} isOpen={false} />)
    })

    test('Then the <Modal> is not rendered', () => {
      expect(wrapper.exists('[data-testing="mock-name-modal"]')).toEqual(false)
    })
  })

  describe('When "hideCloseIcon" prop is false', () => {
    beforeEach(() => {
      wrapper = mount(<Modal {...mockProps} hideCloseIcon={false} />)
    })

    test('Then the "X" icon is rendered', () => {
      expect(wrapper.exists('[data-testing="modal-close-button"]')).toEqual(true)
    })
  })

  describe('When "hideCloseIcon" prop is true', () => {
    beforeEach(() => {
      wrapper = mount(<Modal {...mockProps} hideCloseIcon />)
    })

    test('Then the "X" icon is not rendered', () => {
      expect(wrapper.exists('[data-testing="modal-close-button"]')).toEqual(false)
    })
  })

  describe('When child components are passed to the <Modal>', () => {
    beforeEach(() => {
      const { children, ...mockPropsNoChildren } = mockProps

      wrapper = mount(
        <Modal {...mockPropsNoChildren}>
          <div data-testing="mock-child" />
        </Modal>,
      )
    })

    test('Then they are rendered as expected', () => {
      expect(wrapper.exists('[data-testing="mock-child"]')).toEqual(true)
    })
  })
})
