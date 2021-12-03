import React from 'react'
import { P } from 'Page/Elements'
import TextInput from 'Form/Input'
import { CTA } from 'goustouicomponents'
import Form from 'Form'
import { validateEmail } from 'utils/auth'
import { newsletterSubscribe } from 'apis/customers'
import { homeConfig } from 'config/home'
import css from './EmailForm.module.css'

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
          this.setState({ errorMessage: homeConfig.emailForm.serverError })
        }
      }
    } else {
      this.setState({ errorMessage: homeConfig.emailForm.emailRequired })
    }
  }

  render() {
    const { email, emailSubmitted, errorMessage } = this.state

    return (
      <div className={css.container}>
        <div className={css.wrapper}>
          <h2 className={css.title}>
            <span className={css.infoIcon} />
            <span>Sorry, we’re full to the brim!</span>
          </h2>
          <div>
            {emailSubmitted ? (
              <P className={`${css.text} ${css.mt05}`}>
                <span>{homeConfig.emailForm.success}</span>
              </P>
            ) : (
              <div>
                <P className={css.text}>
                  <span>
                    We can’t take any new customer orders right now. Leave your email below and
                    we’ll let you know as soon as you can place your order. Won’t be long!
                  </span>
                </P>
                <Form onSubmit={this.handleSubmit}>
                  <div className={css.row}>
                    <div className={css.mt05}>
                      <TextInput
                        name="email"
                        color="gray"
                        textAlign="left"
                        type="email"
                        placeholder="Enter your email"
                        onChange={this.emailChanges}
                        value={email}
                        required
                        className={css.input}
                      />
                    </div>
                    <div className={css.mt05}>
                      <CTA onClick={this.handleSubmit} isFullWidth="small-screens-only">
                        <span className={css.ctaText}>Join waitlist</span>
                      </CTA>
                    </div>
                  </div>
                  <P className={css.text}>
                    <span>
                      Already a Gousto subscriber? &nbsp;
                      <a href="#login" className={css.loginAncor}>
                        Log in
                      </a>
                    </span>
                  </P>
                </Form>
              </div>
            )}
            {errorMessage && <p className={`${css.text} ${css.mt05}`}>{errorMessage}</p>}
          </div>
        </div>
      </div>
    )
  }
}

export { EmailForm }
