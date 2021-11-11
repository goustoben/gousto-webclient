import {Verifier} from '@pact-foundation/pact';
import path from 'path';
import axios from 'axios';
import {dynamicStateHandlerMap} from "./__support__/dynamicStateHandlerMap";
import {forEachPactFileIn} from "./__support__/forEachPactFileIn";

const emulationServerBaseUrl = 'http://localhost:3000';

jest.setTimeout(10 * 1000)

test('Verify pacts against emulator', async () => {
    const resultStrings = await forEachPactFileIn(
        path.join(__dirname, '..', '..', '..', 'pact'),
        (pactFilePath: string, providerName: string) => new Verifier({
            providerBaseUrl: emulationServerBaseUrl,
            pactUrls: [pactFilePath],
            logLevel: (process.env.PACT_LOG_LEVEL ? process.env.PACT_LOG_LEVEL : 'error') as 'debug' | 'info' | 'warn' | 'error',
            logDir: path.join(path.join(__dirname, '..', '..', '..', 'pact'), 'logs', 'emulator-verification'),
            verbose: process.env.PACT_LOG_LEVEL ? process.env.PACT_LOG_LEVEL.toLowerCase() === 'debug' : false,
            stateHandlers: dynamicStateHandlerMap(state => () => axios.put(`${emulationServerBaseUrl}/_config/state/${providerName}`, state)),
        }).verifyProvider()
    );

    console.log(resultStrings.join())
});

