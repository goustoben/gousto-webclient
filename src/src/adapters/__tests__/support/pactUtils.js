import { Interaction, Pact } from '@pact-foundation/pact'
import path from 'path'

export async function pactBetween(consumer, provider) {
  const pact = new Pact({
    consumer,
    provider,
    dir: path.resolve(process.cwd(), 'pact', 'pacts'),
    pactfileWriteMode: process.env.PACT_WRITE_FILES === 'true' ? 'update' : 'none',
    log: path.resolve(process.cwd(), 'pact', 'logs', 'pact.log'),
    logLevel: 'debug'
  })

  await pact.setup()

  return pact
}

export function givenNoInitialState() {
  return new Interaction()
}

export function givenInitialState(providerState) {
  return new Interaction()
    .given(JSON.stringify(providerState))
}
