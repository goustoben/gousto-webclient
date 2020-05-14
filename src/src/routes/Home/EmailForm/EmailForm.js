/* eslint-disable global-require */
import React from 'react'
import { P } from 'Page/Elements'
import TextInput from 'Form/Input'
import { Button } from 'goustouicomponents'
import Form from 'Form'
import { validateEmail } from 'utils/auth'
import { newsletterSubscribe } from 'apis/customers'
import config from 'config/home'
import Content from 'containers/Content'
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

    return (
      <div className={css.container}>
        <h2 className={css.title}>
          <Content
            contentKeys="newsletterTitle"
          >
            <span>Want top foodie tips and exclusive offers?</span>
          </Content>
        </h2>
        <div className={css.form}>
          {
            !emailSubmitted
              ? (
                <div>
                  <P className={css.description}>
                    <Content
                      contentKeys="newsletterDescription"
                    >
                      <span>Sign up now to get all our insider info straight to your inbox.</span>
                    </Content>
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
                        className={css.inputs}
                      >
                        Join now
                      </Button>
                    </div>
                  </Form>
                  <P className={css.login}>
                    <span>
                      Already a Gousto subscriber? Please&nbsp;
                      <a href="#login">log in</a>
                      .
                    </span>
                  </P>
                </div>
              )
              : (
                <P className={css.description}>
                  <Content contentKeys="newsletterDescriptionSignup">
                    <span>Wahoo! You’re now signed up.</span>
                  </Content>
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

export {
  EmailForm
}
