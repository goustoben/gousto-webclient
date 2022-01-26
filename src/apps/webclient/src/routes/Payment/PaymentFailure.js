import React, { PureComponent } from 'react'
import { PaymentResult } from './PaymentResult'

class PaymentFailure extends PureComponent {
  render() {
    return (
      <PaymentResult header="Verification failed" success={false}>
        <p>You will now be automatically redirected back to Gousto with further details.</p>
      </PaymentResult>
    )
  }
}

export { PaymentFailure }
