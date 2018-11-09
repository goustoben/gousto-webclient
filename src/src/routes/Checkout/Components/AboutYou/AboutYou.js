import React from 'react'
import { Field, FormSection } from 'redux-form'
import ReduxFormInput from 'Form/ReduxFormInput'
import config from 'config/checkout'
import { capitalizeFirstLetter } from 'utils/text'
import Login from 'Login'
import ModalPanel from 'Modal/ModalPanel'
import Overlay from 'Overlay'
import css from './AboutYou.css'
import ErrorMessage from '../ErrorMessage'

const emailValidator = value => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Please provide a valid email address' : undefined)

class AboutYou extends React.PureComponent {

	static propTypes = {
	  loginVisibilityChange: React.PropTypes.func,
	  loginOpen: React.PropTypes.bool,
	  isAuthenticated: React.PropTypes.bool,
	  loginPending: React.PropTypes.bool,
	  sectionName: React.PropTypes.string,
	  clearErrors: React.PropTypes.func,
	  receiveRef: React.PropTypes.func,
	}

	static defaultProps = {
	  clearErrors: () => {},
	  loginVisibilityChange: () => {},
	  loginOpen: false,
	  loginPending: false,
	  isAuthenticated: false,
	  sectionName: '',
	  receiveRef: () => {},
	}

	componentDidMount() {
	  this.props.clearErrors()
	}

	handleLoginClose = (e) => {
	  if (e) {
	    e.stopPropagation()
	  }
	  this.props.loginVisibilityChange(false)
	  this.setState({ loginPending: false })
	}

	handleLoginOpen = (e) => {
	  e.stopPropagation()
	  this.props.loginVisibilityChange(true)
	}

	render() {
	  const { sectionName } = this.props
	  const titles = config.titles.map(title => ({
	    value: title,
	    label: capitalizeFirstLetter(title),
	  }))

	  return (
			<FormSection name={sectionName}>
				<div className={css.aboutYouContainer} data-testing="checkoutAboutYouSection">
					<div>
						<h3 className={css.header}>About you</h3>
						<span className={css.boldInfo}>All fields are required</span>
						<div className={css.infoSection}>
							<p className={css.textSMNoMargin}>
								Existing customers, please&nbsp;<span className={css.link} onClick={(e) => { if (!this.props.isAuthenticated) { this.handleLoginOpen(e) } }}>Login here&nbsp;<span className={css.arrowRight} /></span>
							</p>
						</div>
					</div>
					<div className={css.row}>
						<div className={css.colSM}>
							<Field
							  name="title"
							  component={ReduxFormInput}
							  options={titles}
							  inputType="DropDown"
							  label="Title"
							  withRef
							  ref={this.props.receiveRef}
							  refId={`${sectionName}.title`}
							/>
						</div>
					</div>
					<div className={css.row}>
						<div className={css.colSM}>
							<Field
							  name="firstName"
							  component={ReduxFormInput}
							  inputType="Input"
							  label="First name"
							  mask
							  withRef
							  ref={this.props.receiveRef}
							  refId={`${sectionName}.firstName`}
							  dataTesting="checkoutFirstNameInput"
							/>
						</div>
						<div className={css.colSM}>
							<Field
							  name="lastName"
							  component={ReduxFormInput}
							  inputType="Input"
							  label="Last name"
							  mask
							  withRef
							  ref={this.props.receiveRef}
							  refId={`${sectionName}.lastName`}
							  dataTesting="checkoutLastNameInput"
							/>
						</div>
					</div>
					<div className={css.row}>
						<div className={css.colMD}>
							<Field
							  name="email"
							  component={ReduxFormInput}
							  inputType="Input"
							  type="email"
							  label="Email address"
							  subLabel="You will use this to login to Gousto"
							  mask
							  withRef
							  ref={this.props.receiveRef}
							  refId={`${sectionName}.email`}
							  dataTesting="checkoutEmailInput"
							  validate={emailValidator}
							/>
						</div>
					</div>
					<div className={css.row}>
						<div className={css.colMD}>
							<Field
							  name="password"
							  component={ReduxFormInput}
							  inputType="Input"
							  type="password"
							  label="Password"
							  subLabel="Must be at least 8 characters"
							  mask
							  withRef
							  ref={this.props.receiveRef}
							  refId={`${sectionName}.password`}
							  dataTesting="checkoutPasswordInput"
							/>
						</div>
					</div>
					<div className={css.row}>
						<div className={css.colHalf}>
							<Field
							  name="allowEmail"
							  component={ReduxFormInput}
							  inputType="CheckBox"
							  childLabel="I'd like to receive the latest news and offers from Gousto, and be contacted occasionally for Customer Success purposes. I can unsubscribe at any time."
							  style="disclaimer"
							  mask
							/>
						</div>
						<div className={css.colHalf}>
							<Field
							  name="allowThirdPartyEmail"
							  component={ReduxFormInput}
							  inputType="CheckBox"
							  childLabel="I would like to receive 3rd party communications from selected partners."
							  style="disclaimer"
							  mask
							/>
						</div>
					</div>
					<Overlay
					  open={this.props.loginOpen}
					  className={css.mobileOverlay}
					  contentClassName={css.mobileModalContent}
					  from="top"
					>
						<ModalPanel
						  closePortal={this.handleLoginClose}
						  className={css.modal}
						  containerClassName={css.modalContainer}
						  disableOverlay
						>
							<Login
							  isAuthenticated={this.props.isAuthenticated}
							  isOpen={this.props.loginOpen}
							  isPending={this.props.loginPending}
							/>
						</ModalPanel>
					</Overlay>
				</div>
				<ErrorMessage />
			</FormSection>
	  )
	}
}

export default AboutYou
