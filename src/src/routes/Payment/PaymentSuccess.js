import React, { PureComponent } from 'react'
import { PaymentResult } from './PaymentResult'

class PaymentSuccess extends PureComponent {
  render() {
    return (
      <PaymentResult header="Verification successful" success>
        <p>
          You will now be automatically redirected back to Craft with no further action required.
        </p>
      </PaymentResult>
    )
  }
}

export { PaymentSuccess }
