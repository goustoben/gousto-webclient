import CookieBanner from './CookieBanner'
import { connect } from 'react-redux'
import cookieActions from 'actions/cookies'

const mapStateToProps = (state) => ({
  copy: {
    button: 'OK, I Agree',
    findMore: 'Find out more',
    description: `We use cookies. By continuing to browse the site 
		you are agreeing to our use of cookies. `,
  },
  isCookiePolicyAccepted: state.cookies.get('isPolicyAccepted'),
})

const mapActionsToProps = {
  cookiePolicyAcceptanceChange: cookieActions.cookiePolicyAcceptanceChange,
}

export default connect(mapStateToProps, mapActionsToProps)(CookieBanner)
