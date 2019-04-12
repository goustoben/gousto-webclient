import { connect } from 'react-redux'

import { selectContactChannel } from 'actions/getHelp'

import Contact from './Contact'

const mapStateToProps = (state) => ({
  content: {
    title: state.content.get('get-help_contact_pageheader_header')
    || 'Contact us',
    body: state.content.get('get-help_contact_pagecontent_copy')
    || 'Please get in touch so one of our customer care agents can help resolve your issue.',
    button1Copy: state.content.get('get-help_orderissues_pagecontent_button1copy')
    || 'back',
    button2Copy: state.content.get('get-help_orderissues_pagecontent_button2copy')
    || 'done',
    chatItem: state.content.get('get-help_orderissues_pagecontent_chatitem')
    || 'Start live chat',
    emailItem: state.content.get('get-help_orderissues_pagecontent_emailitem')
    || 'Contact us by email',
    phoneItem: state.content.get('get-help_orderissues_pagecontent_phoneitem')
    || 'Contact us by phone',
  }
})

const ContactContainer = connect(mapStateToProps, {
  selectContactChannel,
})(Contact)

export default ContactContainer
