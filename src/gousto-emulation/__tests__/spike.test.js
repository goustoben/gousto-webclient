import { Verifier } from '@pact-foundation/pact'
import path from 'path'

jest.setTimeout(45 * 1000)

test('spike', async () => {
  const opts = {
    providerBaseUrl: 'http://localhost:3000',
    pactUrls: [path.join(__dirname, '../../pact/pacts/webclient-core.json')],
    logLevel: 'debug',
    logDir: path.join(__dirname, '..', '..' 'pact', 'logs', 'emulator-verification'),
    // stateHandlers: new Proxy({}, {
    //   get(target, props, receiver) {
    //     return () => {
    //       console.log(`Establishing state for ${props}`)
    //
    //       return Promise.resolve()
    //     }
    //   }
    // }),
    verbose: true
  }
  const verifier = new Verifier(opts)

  const result = await verifier.verifyProvider()

  console.log(result)
})
