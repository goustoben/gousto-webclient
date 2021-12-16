module.exports = {
  getIsLoaded,
  initialiseDatadog,
  setDatadogTestContext,
}

async function getIsLoaded(browser) {
  return execute(browser, function remoteScript() {
    return 'DD_RUM' in window
  })
}

async function initialiseDatadog(browser) {
  return execute(browser, function remoteScript() {
    const initialised = !!window.DD_RUM.getInitConfiguration()
    if (!initialised) {
      window.DD_RUM.init({
        applicationId: "7eaa558f-a187-40c5-b743-9fd52d7aff3a",
        clientToken: "pub7210de2a9d84977c7611bb974aa9f74f",
        site: 'datadoghq.eu',
        service:'gousto-webclient-e2e-staging---test',
        sampleRate: 100,
        trackInteractions: true
      })

      window.DD_RUM.startSessionReplayRecording();
    }
  })
}

async function setDatadogTestContext(browser, context) {
  return execute(browser, function remoteScript(context) {
    window.DD_RUM.setRumGlobalContext(context)
  }, [context])
}


async function execute(browser, scriptFn, args = []) {
  return new Promise((resolve) => {
    browser.execute(scriptFn, args, result => resolve(result.value))
  })
}

