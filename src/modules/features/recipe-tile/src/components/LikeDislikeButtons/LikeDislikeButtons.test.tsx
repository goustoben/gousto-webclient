import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { LikeDislikeButtons } from "./LikeDislikeButtons";
import { isLikeDislikeFeatureEnabled } from './isLikeDislikeFeatureEnabled'
import { RecipeContextProvider } from "../../model/context";
import { UseTrackingContextProvider } from "../../model/context/useTracking";
import Immutable from 'immutable'
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store'

jest.mock('./isLikeDislikeFeatureEnabled');

const createMockStore = (userId: string | undefined) => {
  const state = {
    auth: Immutable.fromJS({
      accessToken: '',
      isAdmin: false,
      id: userId,
    })
  }

  const mockStore = configureMockStore()

  const store = mockStore(state)

  store.dispatch = jest.fn().mockReturnValue(Promise.resolve())

  return store
}

const renderComponent = (userId: string | undefined = undefined) =>
  render(
    <Provider store={createMockStore(userId)}>
      <RecipeContextProvider value={{ id: 'some_id', title: 'Test recipe title' }}>
        <UseTrackingContextProvider
          value={() => ({
            useTrackVariantListDisplay: () => {},
            useTrackingSwapAlternativeOptions: jest.fn(),
            track: () => {},
          })}
        >
          <LikeDislikeButtons />
        </UseTrackingContextProvider>
      </RecipeContextProvider>
    </Provider>,
  )

describe("LikeDislikeButtons", () => {
  beforeEach(() => {
    (isLikeDislikeFeatureEnabled as jest.Mock).mockReturnValue(true);
  })
  
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  describe('when user is logged in', () => {
    describe("when it initially renders", () => {
      test("like icon should be unfilled", () => {
        renderComponent('user-is-logged-in');
        expect(screen.getByLabelText('thumb-up-unfilled')).toBeInTheDocument()
      });
  
      test("dislike icon should be unfilled", () => {
        renderComponent('user-is-logged-in');
        expect(screen.getByLabelText('thumb-down-unfilled')).toBeInTheDocument()
      });
    });
  
    describe("when unfilled icon is clicked", () => {
      test("unfilled like icon should become filled", () => {
        const { getByLabelText } = renderComponent('user-is-logged-in');
        fireEvent.click(screen.getByLabelText('thumb-up-unfilled'))
        expect(getByLabelText('thumb-up-filled')).toBeInTheDocument()
      });
      test("unfilled dislike icon should become filled", () => {
        const { getByLabelText } = renderComponent('user-is-logged-in');
        fireEvent.click(screen.getByLabelText('thumb-down-unfilled'))
        expect(getByLabelText('thumb-down-filled')).toBeInTheDocument()
      });
    });
  
    describe("when unfilled icon is clicked twice", () => {
      test("like icon should be unfilled", () => {
        const { getByLabelText } = renderComponent('user-is-logged-in');
        fireEvent.click(screen.getByLabelText('thumb-up-unfilled'))
        fireEvent.click(screen.getByLabelText('thumb-up-filled'))
        expect(getByLabelText('thumb-up-unfilled')).toBeInTheDocument()
        expect(getByLabelText('thumb-down-unfilled')).toBeInTheDocument()
      });
  
      test("dislike icon should be unfilled", () => {
        const { getByLabelText } = renderComponent('user-is-logged-in');
        fireEvent.click(screen.getByLabelText('thumb-down-unfilled'))
        fireEvent.click(screen.getByLabelText('thumb-down-filled'))
        expect(getByLabelText('thumb-up-unfilled')).toBeInTheDocument()
        expect(getByLabelText('thumb-down-unfilled')).toBeInTheDocument()
      });
  
    });
  
    describe("when like is clicked, then dislike is clicked", () => {
      test("like should be unfilled and dislike filled", () => {
        const { getByLabelText } = renderComponent('user-is-logged-in');
        fireEvent.click(screen.getByLabelText('thumb-up-unfilled'))
        fireEvent.click(screen.getByLabelText('thumb-down-unfilled'))
        expect(getByLabelText('thumb-up-unfilled')).toBeInTheDocument()
        expect(getByLabelText('thumb-down-filled')).toBeInTheDocument()
      });
    });
  })

  describe('when user is logged out', () => {
    test('it should render null', () => {
      const { queryByLabelText } = renderComponent();
      expect(queryByLabelText('thumb-up')).not.toBeInTheDocument()
      expect(queryByLabelText('thumb-down')).not.toBeInTheDocument()
    })
  })

});
