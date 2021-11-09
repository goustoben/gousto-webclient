import { Interaction } from '@pact-foundation/pact'

export function givenNoInitialState() {
  return new Interaction()
}

export function givenInitialState(providerState) {
  return new Interaction()
    .given(JSON.stringify(providerState))
}
