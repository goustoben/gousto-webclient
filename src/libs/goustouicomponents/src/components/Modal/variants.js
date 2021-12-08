export const ANIMATION_DURATION = 250

export const MODAL_ANIMATIONS = {
  slideUpFullScreen: {
    defaultStyle: {
      transitionProperty: 'height',
      transitionTimingFunction: 'cubic-bezier(0.77,0,0.18,1)',
      height: 0,
    },
    transitionStyles: {
      entering: { height: '100%', transitionDuration: `${ANIMATION_DURATION}ms` },
      entered: { height: '100%', transitionDuration: `${ANIMATION_DURATION}ms` },
      exiting: { height: '0', transitionDuration: `${ANIMATION_DURATION / 2}ms` },
      exited: { height: '0', transitionDuration: `${ANIMATION_DURATION / 2}ms` },
    },
  },
  slideUp: {
    defaultStyle: {
      transitionProperty: 'max-height',
      transitionTimingFunction: 'cubic-bezier(0.77,0,0.18,1)',
      maxHeight: 0,
    },
    transitionStyles: {
      entering: { maxHeight: '100%', transitionDuration: `${ANIMATION_DURATION}ms` },
      entered: { maxHeight: '100%', transitionDuration: `${ANIMATION_DURATION}ms` },
      exiting: { maxHeight: '0', transitionDuration: `${ANIMATION_DURATION / 2}ms` },
      exited: { maxHeight: '0', transitionDuration: `${ANIMATION_DURATION / 2}ms` },
    },
  },
  none: {
    defaultStyle: {},
    transitionStyles: {},
  },
}

export const MODAL_VARIANTS = {
  fullScreen: {
    classNames: {
      container: 'modalContainerFullScreen',
    },
    animation: MODAL_ANIMATIONS.slideUpFullScreen,
  },
  floating: {
    classNames: {
      container: 'modalContainerFloating',
    },
    animation: MODAL_ANIMATIONS.none,
  },
  bottomSheet: {
    classNames: {
      container: 'modalContainerBottomSheet',
    },
    animation: MODAL_ANIMATIONS.slideUp,
  },
}
