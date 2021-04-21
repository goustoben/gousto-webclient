import endpoint from 'config/endpoint'

describe('endpoint finder', () => {
  beforeEach(() => {
    global.__SERVER__ = false
    global.__RUNNING_ENV__ = 'local'
    global.__API_ENV__ = 'production'
  })

  describe('defaulting', () => {
    it('should return the correct endpoint when an un-versioned service endpoint is requested with no other parameters', () =>{
      expect(endpoint('core')).toEqual("https://production-api.gousto.co.uk")
    })

    it('should return the first version endpoint when a service endpoint is requested with a version that does not exist', ()=>{
      expect(endpoint('auth', 2)).toEqual("https://production-api.gousto.co.uk/auth/v1.0.0")
    })

    it('should return the first version endpoint when a service endpoint is requested and no version is specified', ()=>{
      expect(endpoint('customers')).toEqual("https://production-api.gousto.co.uk/customers/v1")
    })

    it('should throw an error if a non existent service is requested', () => {
      expect(() => endpoint()).toThrow("Please specify a valid service.")
    })

    it("should throw an error if the requested endpoint isn't specified as either server or client", () => {
      global.__SERVER__ = undefined;
      expect(() => endpoint('auth', 1)).toThrow("Please specify whether this call is coming from the server or client browser for routing purposes.")
    })

    it("should throw an error if the requested endpoint target API environment is missing", () => {
      global.__API_ENV__ = undefined;
      expect(() => endpoint('auth', 1)).toThrow("Please specify which environment to point this call to.")
    })

    it("should throw an error if the running environment of the app (live/local) is not specified", () => {
      global.__RUNNING_ENV__ = undefined;
      expect(() => endpoint('auth', 1)).toThrow("Please specify whether this app is hosted 'locally' or 'live' on AWS.")
    })
  })

  it('should return the correct endpoint if the call is made from the client', () => {
    expect(endpoint('auth', 1, {isCallFromServer: false} )).toEqual("https://production-api.gousto.co.uk/auth/v1.0.0")
  })
  it('should return the correct endpoint if the call is made from the server and the app is running on a live environment', () => {
    /* A live environment was chosen for this test to illustrate how generally calls made from a local environment
    appear like client side calls and calls made from a live environment on the server are behind AWS' routing and hence
     have a different path structure. */
    expect(endpoint('auth', 1, {isCallFromServer: true, appInstanceEnvironment: 'live'} )).toEqual("http://production-auth.gousto.co.uk")
  })
  it('should return the correct endpoint targeting a specific deployed API environment', () => {
    expect(endpoint('auth', 1, {apiEnvironmentToPointTo: 'staging'} )).toEqual("https://staging-api.gousto.info/auth/v1.0.0")
  })
  it('should return the correct endpoint for a call made from a locally ran environment', () => {
    expect(endpoint('auth', 1, {appInstanceEnvironment: 'local'} )).toEqual("https://production-api.gousto.co.uk/auth/v1.0.0")
  })
  it('should return the correct endpoint for a call made from a live environment hosted on AWS', () => {
    expect(endpoint('auth', 1, {appInstanceEnvironment: 'live'} )).toEqual("https://production-api.gousto.co.uk/auth/v1.0.0")
  })
})
