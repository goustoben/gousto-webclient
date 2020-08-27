import React from 'react'
import PropTypes from 'prop-types'
import { client as routes } from 'config/routes'
import { GetHelpLayout } from '../../layouts/GetHelpLayout'
import { BottomFixedContentWrapper } from '../BottomFixedContentWrapper'
import { BottomButton } from '../BottomButton'

const propTypes = {
  content: PropTypes.shape({
    button1: PropTypes.string,
    errorBody: PropTypes.string,
    title: PropTypes.string,
  }),
}

const defaultProps = {
  content: {
    button1: 'Contact Us',
    errorBody: `There was a problem in getting your default.
    Please contact us below, or try again later.`,
    title: 'Get help with your box',
  },
}

const Error = ({ content }) => (
  <GetHelpLayout
    title={content.title}
  >
    <p>{content.errorBody}</p>
    <BottomFixedContentWrapper>
      <BottomButton
        color="secondary"
        url={`${routes.getHelp.index}/${routes.getHelp.contact}`}
        clientRouted={false}
      >
        {content.button1}
      </BottomButton>
    </BottomFixedContentWrapper>
  </GetHelpLayout>
)

Error.defaultProps = defaultProps
Error.propTypes = propTypes

export {
  Error
}
