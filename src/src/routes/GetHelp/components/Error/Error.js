import React from 'react'
import PropTypes from 'prop-types'
import GetHelpLayout from 'layouts/GetHelpLayout'
import BottomBar from 'BottomBar'
import { BottomButton } from '../BottomButton'
import { client as routes } from 'config/routes'

const propTypes = {
  content: PropTypes.shape({
    button1: PropTypes.string,
    errorBody: PropTypes.string,
    title: PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
  hasError: PropTypes.bool.isRequired,
}

const defaultProps = {
  content: {
    button1: 'Contact Us',
    errorBody: `There was a problem in getting your default.
    Please contact us below, or try again later.`,
    title: 'Get help with your box',
  },
}

const Error = ({ hasError, content, children }) => {
  if (hasError) {
    return (
      <GetHelpLayout
        title={content.title}
        fullWidthContent
      >
        <p>{content.errorBody}</p>
        <BottomBar>
          <BottomButton
            color="secondary"
            url={`${routes.getHelp.index}/${routes.getHelp.contact}`}
            clientRouted={false}
          >
            {content.button1}
          </BottomButton>
        </BottomBar>
      </GetHelpLayout>
    )
  }

  return children
}

Error.defaultProps = defaultProps
Error.propTypes = propTypes

export {
  Error
}
