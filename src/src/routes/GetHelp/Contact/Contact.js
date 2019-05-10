import PropTypes from 'prop-types'
import React from 'react'

import { Item, ItemExpandable } from 'goustouicomponents'
import { List } from '../components/List'
import { ItemLink } from '../components/ItemLink'
import PhoneContent from './PhoneContent'
import BottomBar from 'BottomBar'
import { BottomButton } from '../components/BottomButton'

import { client, zendesk } from 'config/routes'

import GetHelpLayout from 'layouts/GetHelpLayout'

const openLiveChat = () => {
  window.$zopim.livechat.window.show()
}

const trackClick = (selectContactChannel, channel) => () => selectContactChannel(channel)

const Contact = ({
  content: {
    title,
    body,
    button1Copy,
    button2Copy,
    chatItem,
    emailItem,
    phoneItem,
  },
  selectContactChannel
}) => (
  <GetHelpLayout title={title} body={body}>
    <List>
      <Item
        label={chatItem}
        trackClick={trackClick(selectContactChannel, 'chat')}
        isHiddenOnMobile
        onClick={openLiveChat}
      />
      <ItemLink
        label={emailItem}
        trackClick={trackClick(selectContactChannel, 'email')}
        to={zendesk.link}
        clientRouted={false}
      />
      <ItemExpandable
        label={phoneItem}
        trackClick={trackClick(selectContactChannel, 'phone')}
      >
        <PhoneContent />
      </ItemExpandable>
    </List>
    <BottomBar>
      <BottomButton color="secondary" url={client.getHelp.index} clientRouted>
        {button1Copy}
      </BottomButton>
      <BottomButton color="primary" url={client.myGousto} clientRouted={false}>
        {button2Copy}
      </BottomButton>
    </BottomBar>
  </GetHelpLayout>
)

Contact.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    button1Copy: PropTypes.string.isRequired,
    button2Copy: PropTypes.string.isRequired,
    chatItem: PropTypes.string.isRequired,
    emailItem: PropTypes.string.isRequired,
    phoneItem: PropTypes.string.isRequired,
  }).isRequired,
  selectContactChannel: PropTypes.func,
}

Contact.defaultProps = {
  selectContactChannel: () => {},
}

export default Contact
