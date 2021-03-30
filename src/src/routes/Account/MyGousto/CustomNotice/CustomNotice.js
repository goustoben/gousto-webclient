import React from 'react'
import { Alert, Heading } from 'goustouicomponents'

// THIS COMPONENT SHOULD NOT BE DELETED EVEN IF IT'S NOT IN USE
// UNTIL WE HAVE A SOLUTION TO QUICKLY DISPLAY BANNER INFORMING THE
// CUSTOMER ABOUT UNFORSEEN EVENTS THAT HAPPEN
const CustomNotice = () => (
  <Alert type="info">
    <Heading type="h3" size="_legacy_medium">
      We&#39;re having a small technical issue displaying your pending order
    </Heading>
    <div>
      <p>
        Don&#39;t worry, we&#39;re working hard to get this fixed and everything will be up and running as soon as possible. Please check back tomorrow to choose your recipes as normal.
      </p>
    </div>
  </Alert>
)

export {
  CustomNotice
}
