import React, { useReducer, useCallback } from 'react'
import styled from '@emotion/styled'

import { isLikeDislikeFeatureEnabled } from './isLikeDislikeFeatureEnabled'
import { useRecipe } from '../../model/context'
import { useTrackingHook } from '../../model/context/useTracking'

import { 
  cssLikeDislikeButtons, 
  cssLikeButton, 
  cssDislikeButton, 
  cssThumb
} from './styles'

const LikeDislikeButtonsWrapper = styled.div(cssLikeDislikeButtons as any)
const Like = styled.div(cssLikeButton as any)
const Dislike = styled.div(cssDislikeButton as any)
const Svg = styled.svg(cssThumb as any)

type LikeButtonProps = {
  isLikeSelected: boolean
  onClick: (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void
}

type DislikeButtonProps = {
  isDislikeSelected: boolean
  onClick: (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void
}

type Action = { type: 'like' | 'dislike' }

type State = { selected: 'like' | 'dislike' | null }

const initialState: State = { selected: null }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'like':
      return { selected: state.selected === 'like' ? null : 'like' }
    case 'dislike':
      return { selected: state.selected === 'dislike' ? null : 'dislike' }
    default:
      throw new Error()
  }
}

const TRACKING_EVENT_KEY = 'like_dislike_button_click'

export const LikeDislikeButtons = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const useTracking = useTrackingHook()
  const { track } = useTracking()
  const { id: recipeId } = useRecipe()

  const handleOnClickLike = useCallback((e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => {
    e.stopPropagation()
    const action: Action = { type: 'like' }
    dispatch(action)
    track(TRACKING_EVENT_KEY, {
      recipeId,
      likeDislikeStatus: reducer(state, action).selected,
    })
  }, [ track, recipeId, state ])

  const handleOnClickDislike = useCallback((e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => {
    e.stopPropagation()
    const action: Action = { type: 'dislike' }
    dispatch(action)
    track(TRACKING_EVENT_KEY, {
      recipeId,
      likeDislikeStatus: reducer(state, action).selected,
    })
  }, [ track, recipeId, state ])

  if (!isLikeDislikeFeatureEnabled()) {
    return null
  }

  return (
    <LikeDislikeButtonsWrapper>
        <DislikeButton onClick={handleOnClickDislike} isDislikeSelected={state.selected === 'dislike'} />
        <LikeButton onClick={handleOnClickLike} isLikeSelected={state.selected === 'like'} />
    </LikeDislikeButtonsWrapper>
  )
}

export const LikeButton = ({ onClick, isLikeSelected }: LikeButtonProps) => {
  return (
    <Like
      role="button"
      aria-label={'thumb-up'}
      onClick={(event) => onClick(event)}
      onKeyDown={(event) => onClick(event)}
      tabIndex={0}
    >
      <Svg viewBox="-1 -1 25 25">
        {!isLikeSelected && (
          <path
            aria-label={'thumb-up-unfilled'}
            d="M 8 20 H 17 C 17.83 20 18.54 19.5 18.84 18.78 L 21.86 11.73 C 21.95 11.5 22 11.26 22 11 V 9 C 22 7.9 21.1 7 20 7 H 13.69 L 14.64 2.43 L 14.67 2.11 C 14.67 1.7 14.5 1.32 14.23 1.05 L 13.17 0 L 6.58 6.59 C 6.22 6.95 6 7.45 6 8 V 18 C 6 19.1 6.9 20 8 20 Z M 8 8 L 12.34 3.66 L 11 9 H 20 V 11 L 17 18 H 8 V 8 Z M 0 8 H 4 V 20 H 0 V 8 Z"
          />
        )}
        {isLikeSelected && (
          <path
            aria-label={'thumb-up-filled'}
            d="M 0 20 H 4 V 8 H 0 V 20 Z M 22 9 C 22 7.9 21.1 7 20 7 H 13.69 L 14.64 2.43 L 14.67 2.11 C 14.67 1.7 14.5 1.32 14.23 1.05 L 13.17 0 L 6.59 6.59 C 6.22 6.95 6 7.45 6 8 V 18 C 6 19.1 6.9 20 8 20 H 17 C 17.83 20 18.54 19.5 18.84 18.78 L 21.86 11.73 C 21.95 11.5 22 11.26 22 11 V 9 Z"
          />
        )}
      </Svg>
    </Like>
  )
}

export const DislikeButton = ({ onClick, isDislikeSelected }: DislikeButtonProps) => {
  return (
    <Dislike
      role="button"
      aria-label={'thumb-down'}
      onClick={(event) => onClick(event)}
      onKeyDown={(event) => onClick(event)}
      tabIndex={0}
    >
      <Svg viewBox="-1 -4 25 25">
        {!isDislikeSelected && (
          <path
            aria-label={'thumb-down-unfilled'}
            d="M 14 0 H 5 C 4.17 0 3.46 0.5 3.16 1.22 L 0.14 8.27 C 0.05 8.5 0 8.74 0 9 V 11 C 0 12.1 0.9 13 2 13 H 8.31 L 7.36 17.57 L 7.33 17.89 C 7.33 18.3 7.5 18.68 7.77 18.95 L 8.83 20 L 15.42 13.41 C 15.78 13.05 16 12.55 16 12 V 2 C 16 0.9 15.1 0 14 0 Z M 14 12 L 9.66 16.34 L 11 11 H 2 V 9 L 5 2 H 14 V 12 Z M 18 0 H 22 V 12 H 18 V 0 Z"
          />
        )}
        {isDislikeSelected && (
          <path
            aria-label={'thumb-down-filled'}
            d="M 14 0 H 5 C 4.17 0 3.46 0.5 3.16 1.22 L 0.14 8.27 C 0.05 8.5 0 8.74 0 9 V 11 C 0 12.1 0.9 13 2 13 H 8.31 L 7.36 17.57 L 7.33 17.89 C 7.33 18.3 7.5 18.68 7.77 18.95 L 8.83 20 L 15.42 13.41 C 15.78 13.05 16 12.55 16 12 V 2 C 16 0.9 15.1 0 14 0 Z M 18 0 V 12 H 22 V 0 H 18 Z"
          />
        )}
      </Svg>
    </Dislike>
  )
}

