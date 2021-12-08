import React from 'react'
import { Alert } from '../src/components/Alert'

const LegacyWarning = () => (
  <Alert type="warning">
    This component is considered a legacy component. Please avoid reusing it but do try to build a new one that will be more generic and flexible.
  </Alert>
)

export {
  LegacyWarning
}
