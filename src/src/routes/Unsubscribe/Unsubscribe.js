import PropTypes from 'prop-types'
import React from 'react'

import { PageContent, PageHeader } from 'Page'
import { Confirm } from './Confirm'
import { Unsubscribed } from './Unsubscribed'

import css from './Unsubscribe.css'

const propTypes = {
  location: PropTypes.shape({
    query: PropTypes.shape({
      authUserId: PropTypes.string,
      marketingType: PropTypes.string,
      marketingUnsubscribeToken: PropTypes.string,
    }),
  }),
  copy: PropTypes.shape({
    confirmHeader: PropTypes.string,
    unsubscribedHeader: PropTypes.string,
    defaultError: PropTypes.string,
    body1: PropTypes.string,
    body2: PropTypes.string,
    link: PropTypes.string,
    button: PropTypes.string,
  }).isRequired,
  error: PropTypes.string.isRequired,
  pending: PropTypes.bool.isRequired,
  isUserUnsubscribed: PropTypes.bool.isRequired,
  userUnsubscribeAction: PropTypes.func.isRequired,
}

const defaultProps = {
  location: {
    query: {
      authUserId: '',
      marketingType: '',
      marketingUnsubscribeToken: '',
    },
  },
}

export class Unsubscribe extends React.PureComponent {
  state = {}

  unsubscribeHander = () => {
    const { location, userUnsubscribeAction } = this.props
    const { authUserId, marketingType, marketingUnsubscribeToken } = location.query

    userUnsubscribeAction({
      authUserId,
      marketingType,
      marketingUnsubscribeToken,
    })
  }

  render() {
    const { pending, error, isUserUnsubscribed, copy } = this.props
    const titleCopy = (isUserUnsubscribed)
      ? copy.unsubscribedHeader
      : copy.confirmHeader

    return (
      <div className={css.unsubscribePage}>
        <PageHeader title={titleCopy} />
        <PageContent>
          {
            (!isUserUnsubscribed) ? (
              <Confirm
                isError={!!error}
                pending={pending}
                unsubscribeClick={this.unsubscribeHander}
                copy={{
                  defaultError: copy.defaultError,
                  body1: copy.body1,
                  body2: copy.body2,
                  button: copy.button,
                }}
                dataTesting="confirm-unsubscribe"
              />
            ) : <Unsubscribed copy={{ link: copy.link }} />
          }
        </PageContent>
      </div>
    )
  }
}

Unsubscribe.propTypes = propTypes
Unsubscribe.defaultProps = defaultProps
