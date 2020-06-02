/* eslint-disable global-require */
import React from 'react'
import { P } from 'Page/Elements'
import TextInput from 'Form/Input'
import { Button } from 'goustouicomponents'
import Form from 'Form'
import { validateEmail } from 'utils/auth'
import { newsletterSubscribe } from 'apis/customers'
import config from 'config/home'
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
          <span>Join our Gousto Priority Queue</span>
        </h2>
        <div className={css.form}>
          {
            !emailSubmitted
              ? (
                <div>
                  <P className={css.description}>
                    <span>We&apos;re full to the brim right now and can&apos;t take any new customer orders - if you leave your contact details below, we&apos;ll let you know as soon as you can place your order. Won&apos;t be long!</span>
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
                  <span>Thank you, you&apos;re in the queue. We&apos;ll let you know as soon as you can place your order</span>
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
