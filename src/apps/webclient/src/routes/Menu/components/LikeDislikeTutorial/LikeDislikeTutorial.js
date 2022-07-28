import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { incrementTutorialViewed, tutorialTracking } from 'actions/tutorial'
import { Portal } from 'components/Portal'
import { Tutorial, Step } from 'components/Tutorial'
import { getBrowserType } from 'selectors/browser'

import { useShowLikeDislikeTutorial, tutorialName } from './useShowLikeDislikeTutorial'

import css from './LikeDislikeTutorial.css'

export const LikeDislikeTutorial = () => {
  const dispatch = useDispatch()
  const showTutorial = useShowLikeDislikeTutorial()
  const browserType = useSelector(getBrowserType)
  const isMobile = browserType === 'mobile'

  const onCloseTutorial = (step) => {
    dispatch(incrementTutorialViewed(tutorialName))
    dispatch(tutorialTracking(tutorialName, step, true))
  }

  const trackStepViewed = (step) => {
    dispatch(tutorialTracking(tutorialName, step, false))
  }

  if (!showTutorial) {
    return null
  }

  return (
    <Portal>
      <div data-testing="likeDislikeTutorial">
        <Tutorial onClose={onCloseTutorial} trackStepViewed={trackStepViewed}>
          <Step selector={`[data-like-dislike-buttons='like-dislike-buttons']`}>
            <div className={css.newTag}>
              <svg className={css.tagSvg} viewBox="0 0 43 23">
                <rect className={css.tagBackground} />
                <path
                  d="M12.423 6.393V12.555L7.171 6.393H6.105V16H7.86V9.89L13.021 16H14.178V6.393H12.423ZM16.3882 16H22.7712V14.336H18.1692V11.97H22.4202V10.319H18.1692V8.057H22.7712V6.393H16.3882V16ZM26.7737 16H28.1907L30.3357 9.5L32.5067 16H33.9107L37.1087 6.393H35.1717L33.1827 12.984L30.8687 6.393H29.7897L27.5277 12.984L25.4997 6.393H23.5627L26.7737 16Z"
                  fill="white"
                />
              </svg>
            </div>

            {isMobile && <p className={css.main}>Like and dislike</p>}
            {!isMobile && (
              <>
                <div className={css.thumbs}>
                  <svg className={css.thumbsSvg} viewBox="0 0 42 42">
                    <path
                      d="M14.2517 35.1667C13.5017 35.1667 12.8351 34.875 12.2517 34.2917C11.6684 33.7084 11.3767 33.0417 11.3767 32.2917V14.7917C11.3767 14.375 11.4392 14.007 11.5642 13.6875C11.6892 13.3681 11.9323 13.0278 12.2934 12.6667L23.1267 1.62502L24.9184 3.08335C25.1128 3.25002 25.2587 3.47224 25.3559 3.75002C25.4531 4.02779 25.5017 4.36113 25.5017 4.75002V5.08335L23.6267 13.5417H35.8767C36.6267 13.5417 37.2864 13.8264 37.8559 14.3959C38.4253 14.9653 38.7101 15.625 38.7101 16.375V19.3334C38.7101 19.75 38.6892 20.1042 38.6476 20.3959C38.6059 20.6875 38.5712 20.8889 38.5434 21L33.4184 32.8334C33.1406 33.4722 32.6823 34.0209 32.0434 34.4792C31.4045 34.9375 30.7378 35.1667 30.0434 35.1667H14.2517ZM14.2517 32.2917H30.5851L35.8351 19.7917V16.375H20.2934L22.4184 6.25002L14.2517 14.7917V32.2917ZM1.2934 35.1667H8.87673V14.7917H1.2934L1.2934 35.1667ZM14.2517 32.2917V14.7917V16.375V19.7917V32.2917Z"
                      fill="#AEB7C0"
                    />
                  </svg>
                  <svg className={css.thumbsSvg} viewBox="0 0 42 42">
                    <path
                      d="M25.7507 4.83334C26.5007 4.83334 27.1674 5.12501 27.7507 5.70834C28.334 6.29167 28.6257 6.95834 28.6257 7.70834V25.2083C28.6257 25.625 28.5632 25.9931 28.4382 26.3125C28.3132 26.632 28.0702 26.9722 27.709 27.3333L16.8757 38.375L15.0841 36.9167C14.8896 36.75 14.7438 36.5278 14.6466 36.25C14.5493 35.9722 14.5007 35.6389 14.5007 35.25V34.9167L16.3757 26.4583H4.12572C3.37572 26.4583 2.716 26.1736 2.14655 25.6042C1.57711 25.0347 1.29239 24.375 1.29239 23.625V20.6667C1.29239 20.25 1.31322 19.8958 1.35489 19.6042C1.39655 19.3125 1.43127 19.1111 1.45905 19L6.58405 7.16667C6.86183 6.52778 7.32016 5.97918 7.95905 5.52084C8.59794 5.06251 9.26461 4.83334 9.95905 4.83334H25.7507ZM25.7507 7.70834H9.41739L4.16739 20.2083V23.625H19.709L17.584 33.75L25.7507 25.2083V7.70834ZM38.709 4.83334H31.1257V25.2083H38.709V4.83334ZM25.7507 7.70834V25.2083V23.625V20.2083V7.70834Z"
                      fill="#AEB7C0"
                    />
                  </svg>
                </div>
                <p className={css.main}>Like and dislike recipes</p>
              </>
            )}

            <p className={css.text}>
              Tell us which recipes you do and don’t like and we’ll use this to improve your
              recommendations.
            </p>
          </Step>
        </Tutorial>
      </div>
    </Portal>
  )
}
