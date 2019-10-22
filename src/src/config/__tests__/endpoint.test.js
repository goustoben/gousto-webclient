import endpoint from 'config/endpoint'

describe('endpoint', () => {
  global.__DOMAIN__ = 'gousto.local'
  let service

  describe('when the service is "webclient"', () => {
    beforeEach(() => {
      service = 'webclient'
    })

    describe('and being in the server side', () => {
      beforeEach(() => {
        global.__SERVER__ = true
        global.__ENV__ = 'whateverenv'
      })

      test('an http address with the corresponding ENV, SERVICE and DOMAIN is returned', () => {
        const url = endpoint(service)
        expect(url).toBe(`http://${__ENV__}-${service}.${__DOMAIN__}`)
      })
    })

    describe('and not being in the server side', () => {
      beforeEach(() => {
        global.__SERVER__ = false
      })

      describe('and the environment is production', () => {
        beforeEach(() => {
          global.__ENV__ = 'production'
        })

        test('an https address with "www" and without the service, but with the DOMAIN is returned', () => {
          const url = endpoint(service)
          expect(url).toBe(`https://www.${__DOMAIN__}`)
        })
      })

      describe('and the environment is not production', () => {
        beforeEach(() => {
          global.__ENV__ = 'haricots'
        })

        test('an https address with the corresponding ENV, SERVICE and DOMAIN is returned', () => {
          const url = endpoint(service)
          expect(url).toBe(`https://${__ENV__}-${service}.${__DOMAIN__}`)
        })
      })
    })
  })

  describe('when the service is not "webclient"', () => {
    beforeEach(() => {
      service = 'customers'
    })

    describe('and the env is not "local"', () => {
      beforeEach(() => {
        global.__ENV__ = 'haricots'
      })

      describe('and being in the server side', () => {
        beforeEach(() => {
          global.__SERVER__ = true
        })

        test('an http address with the corresponding ENV, SERVICE and DOMAIN is returned', () => {
          const url = endpoint(service)
          expect(url).toBe(`http://${__ENV__}-${service}.${__DOMAIN__}`)
        })
      })

      describe('and not being in the server side', () => {
        beforeEach(() => {
          global.__SERVER__ = false
        })

        describe('and the service is core', () => {
          beforeEach(() => {
            service = 'core'
          })

          test('an https API address with the corresponding ENV and DOMAIN is returned', () => {
            const url = endpoint(service)
            expect(url).toBe(`https://${__ENV__}-api.${__DOMAIN__}`)
          })

          describe('and a version was passed', () => {
            test('an https API address with the corresponding ENV, DOMAIN, SERVICE and VERSION is returned', () => {
              const version = 'v8'
              const url = endpoint(service, version)
              expect(url).toBe(
                `https://${__ENV__}-api.${__DOMAIN__}/${version}`
              )
            })
          })
        })

        describe('and a version was passed', () => {
          test('an https API address with the corresponding ENV, DOMAIN, SERVICE and VERSION is returned', () => {
            const version = 'v7'
            const url = endpoint(service, version)
            expect(url).toBe(
              `https://${__ENV__}-api.${__DOMAIN__}/${service}/${version}`
            )
          })
        })

        describe('and a version was not passed', () => {
          test('an https API address with the corresponding ENV, DOMAIN and SERVICE is returned', () => {
            const url = endpoint(service)
            expect(url).toBe(`https://${__ENV__}-api.${__DOMAIN__}/${service}`)
          })
        })
      })
    })

    describe('and the env is "local"', () => {
      beforeEach(() => {
        global.__ENV__ = 'local'
      })

      describe('and the service is core', () => {
        beforeEach(() => {
          service = 'core'
        })

        describe('and being in the client side', () => {
          beforeEach(() => {
            global.__CLIENT__ = true
          })

          test('an http API address with the corresponding DOMAIN is returned', () => {
            const url = endpoint(service)
            expect(url).toBe(`http://api.${__DOMAIN__}`)
          })
        })

        describe('and not being in the client side', () => {
          beforeEach(() => {
            global.__CLIENT__ = false
          })

          test('an http API address with the corresponding DOMAIN and port 80 is returned', () => {
            const url = endpoint(service)
            expect(url).toBe(`http://api.${__DOMAIN__}:80`)
          })
        })
      })

      describe('and the service is not core', () => {
        beforeEach(() => {
          service = 'recipes'
        })

        describe('and being in the client side', () => {
          beforeEach(() => {
            global.__CLIENT__ = true
          })

          test('an http API address with the corresponding DOMAIN, SERVICE and VERSION is returned', () => {
            const version = 'v6'
            const url = endpoint(service, version)
            expect(url).toBe(`http://api.${__DOMAIN__}/${service}/${version}`)
          })
        })

        describe('and not being in the client side', () => {
          beforeEach(() => {
            global.__CLIENT__ = false
          })

          test('an http API address with the corresponding DOMAIN, port 80, SERVICE and VERSION is returned', () => {
            const version = 'v6'
            const url = endpoint(service, version)
            expect(url).toBe(
              `http://api.${__DOMAIN__}:80/${service}/${version}`
            )
          })
        })
      })
    })
  })
})
