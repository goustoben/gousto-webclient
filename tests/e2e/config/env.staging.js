module.exports = () => ({
  launch_url: "https://staging-webclient.gousto.info",
  desiredCapabilities: {
    browserName: "chrome",
    acceptSslCerts: true,
    acceptInsecureCerts: true,
    chromeOptions: {
      args: ["headless"],
    },
  }
});
