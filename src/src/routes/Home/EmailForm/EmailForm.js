import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { P } from 'Page/Elements'
import TextInput from 'Form/Input'
import { Button } from 'goustouicomponents'
import Form from 'Form'
import { validateEmail } from 'utils/auth'
import { newsletterSubscribe } from 'apis/customers'
import config from 'config/home'
import typography from 'design-language/typography.css'
import css from './EmailForm.css'

class EmailForm extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      email: '',
      emailValid: false,
      emailSubmitted: false,
      errorMessage: '',
    }
  }

  emailChanges = (value) => {
    this.setState({ email: value })
    if (value.length > 0 && validateEmail(value)) {
      this.setState({ emailValid: true })
    } else {
      this.setState({ emailValid: false })
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { email, emailValid } = this.state
    if (emailValid) {
      try {
        await newsletterSubscribe(email)
        this.setState({ emailSubmitted: true })
        this.setState({ errorMessage: '' })
      } catch (e) {
        if (e.code === 'validation.unique.email') {
          this.setState({ emailSubmitted: true })
          this.setState({ errorMessage: '' })
        } else {
          this.setState({ errorMessage: config.emailForm.serverError })
        }
      }
    } else {
      this.setState({ errorMessage: config.emailForm.emailRequired })
    }
  }

  render() {
    const { email, emailSubmitted, errorMessage } = this.state
    const { isHomePageRedesignEnabled } = this.props

    return (
      <div className={classnames(css.container, { [css.homepageRedesign]: isHomePageRedesignEnabled })}>
        <h2 className={classnames(css.title, { [typography.fontStyleXL]: isHomePageRedesignEnabled })}>
          <span>Hungry for cooking ideas?</span>
        </h2>
        <div className={css.form}>
          {
            !emailSubmitted
              ? (
                <div>
                  <P className={classnames(css.description, {[typography.fontStyleBody]: isHomePageRedesignEnabled })}>
                    <span>Get weekly recipe inspiration and our best cooking tips delivered straight to your inbox</span>
                  </P>
                  <Form onSubmit={this.handleSubmit}>
                    <div className={css.row}>
                      <div className={css.input}>
                        <TextInput
                          name="email"
                          color="gray"
                          textAlign="left"
                          type="email"
                          placeholder="Enter email"
                          onChange={this.emailChanges}
                          value={email}
                          required
                          className={css.inputs}
                        />
                      </div>
                      <Button
                        onClick={this.handleSubmit}
                        className={classnames(css.inputs, {[typography.fontStyleSubHead]: isHomePageRedesignEnabled })}
                      >
                        Subscribe now
                      </Button>
                    </div>
                  </Form>
                </div>
              )
              : (
                <P className={css.description}>
                  <span>Hooray! You are now subscribed to our delicious emails.</span>
                </P>
              )
          }
          {
            errorMessage
              ? (
                <div className={css.row}>
                  <p className={css.errorMsg}>{errorMessage}</p>
                </div>
              )
              : null
          }
        </div>
      </div>
    )
  }
}

EmailForm.propTypes = {
  isHomePageRedesignEnabled: PropTypes.bool,
}

EmailForm.defaultProps = {
  isHomePageRedesignEnabled: false,
}

export {
  EmailForm
}
