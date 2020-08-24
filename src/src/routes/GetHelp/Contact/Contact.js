import PropTypes from 'prop-types'
import React from 'react'

import { Item, ItemExpandable } from 'goustouicomponents'
import { client, zendesk } from 'config/routes'
import { addUserIdToUrl } from 'utils/url'
import { GetHelpLayout } from 'layouts/GetHelpLayout'
import { List } from '../components/List'
import { ItemLink } from '../components/ItemLink'
import { PhoneContent } from './PhoneContent'
import { BottomFixedContentWrapper } from '../components/BottomFixedContentWrapper'
import { BottomButton } from '../components/BottomButton'

const openLiveChat = () => {
  window.$zopim.livechat.window.show()
}

const trackClick = (selectContactChannel, channel) => () => selectContactChannel(channel)

const Contact = ({
  content: {
    title,
    body,
    button1Copy,
    chatItem,
    emailItem,
    phoneItem,
  },
  selectContactChannel,
  userId,
}) => (
  <GetHelpLayout title={title} body={body}>
    <List>
      <Item
        label={chatItem}
        trackClick={trackClick(selectContactChannel, 'chat')}
        onClick={openLiveChat}
      />
      <ItemLink
        label={emailItem}
        trackClick={trackClick(selectContactChannel, 'email')}
        to={addUserIdToUrl(zendesk.emailForm, userId)}
        clientRouted={false}
      />
      <ItemExpandable
        label={phoneItem}
        trackClick={trackClick(selectContactChannel, 'phone')}
      >
        <PhoneContent />
      </ItemExpandable>
    </List>
    <BottomFixedContentWrapper>
      <BottomButton
        color="primary"
        url={client.myGousto}
        clientRouted={false}
        fullWidth
      >
        {button1Copy}
      </BottomButton>
    </BottomFixedContentWrapper>
  </GetHelpLayout>
)

Contact.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    button1Copy: PropTypes.string.isRequired,
    chatItem: PropTypes.string.isRequired,
    emailItem: PropTypes.string.isRequired,
    phoneItem: PropTypes.string.isRequired,
  }).isRequired,
  selectContactChannel: PropTypes.func,
  userId: PropTypes.string.isRequired,
}

Contact.defaultProps = {
  selectContactChannel: () => {},
}

export {
  Contact
}
