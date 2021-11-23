import logger from '../logger'

describe('browser logger', () => {
  test('Info logs log_level, service and message', () => {
    const logs = logger.info('Plain info log')
    expect(logs).toEqual('{"log_level":"INFO","service":"webclient","message":"Plain info log"}')
  })

  test('Notice logs log_level, service, message, request, url, gousto-request-id, headers', () => {
    const logs = logger.notice({ message: 'request', requestUrl: 'url', uuid: 'id', headers: {header: 'h'} })
    expect(logs)
      .toEqual('{"log_level":"NOTICE","service":"webclient","message":"request","requestUrl":"url","gousto-request-id":"id","headers":{"header":"h","cookie":""}}')
  })

  test('Debug logs log_level, service, message', () => {
    const logs = logger.debug('Plain debug log')
    expect(logs).toEqual('{"log_level":"DEBUG","service":"webclient","message":"Plain debug log"}')
  })

  test('Debug logs log_level, service, message, actor, involves', () => {
    const logs = logger.debug({message: 'Plain debug log', actor: 'Actor', involves: 'Inv'})
    expect(logs).toEqual('{"log_level":"DEBUG","service":"webclient","message":"Plain debug log","actor":"Actor","involves":"Inv"}')
  })

  test('Warning logs log_level, service, message, errors with an error as an object', () => {
    const logs = logger.warning({message: 'Warning with error', errors: [{error: 'a'}]})
    expect(logs).toEqual('{"log_level":"WARNING","service":"webclient","message":"Warning with error","errors":[{"error":"a"}]}')
  })

  test('Critical logs log_level, service, message, errors with an error as a sting', () => {
    const logs = logger.critical({message: 'Plain critical log', errors: ['error']})
    expect(logs).toEqual('{"log_level":"CRITICAL","service":"webclient","message":"Plain critical log","errors":["error"]}')
  })
})
