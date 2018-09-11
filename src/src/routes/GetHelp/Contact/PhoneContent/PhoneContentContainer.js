import { connect } from 'react-redux'

import { telephone } from 'config/company'

import PhoneContent from './PhoneContent'

const mapStateToProps = (state) => ({
	content: {
		copy1: state.content.get('get-help_contact_phonecontent_copy1')
		|| 'Call us on ',
		phoneNumber: telephone.number,
		phoneNumberLink: telephone.link,
		copy2: state.content.get('get-help_contact_phonecontent_copy2')
		|| '. We are available on weekdays from 9:30am - 7:30pm, and on weekends from 10:30am - 6:30pm',
	}
})

const PhoneContentContainer = connect(mapStateToProps, {})(PhoneContent)

export default PhoneContentContainer
