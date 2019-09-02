const getShortlistTutorialFirstStep = (state) => state.tutorial.getIn(['viewed', 'shortlistStep1'])
const getShortlistTutorialSecondStep = (state) => state.tutorial.getIn(['viewed', 'shortlistStep2'])

export { getShortlistTutorialFirstStep, getShortlistTutorialSecondStep }
