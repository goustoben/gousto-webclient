import { Verifier, VerifierOptions } from '@pact-foundation/pact';
import path from 'path';

jest.setTimeout(45 * 1000)

describe('Core Pact Verification', () => {
    it('test against local pacts', async () => {
        const opts: VerifierOptions = {
            providerBaseUrl: 'http://localhost:3000',
            pactUrls: [path.join(__dirname, '../../../src/pact/pacts/webclient-core.json')],
            logLevel: 'debug',
        };

        await new Verifier(opts).verifyProvider()
    });
});
