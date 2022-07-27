module.exports = () => ({
  launch_url: "https://turnips-webclient.gousto.info",
  desiredCapabilities: {
    browserName: "chrome",
    acceptSslCerts: true,
    acceptInsecureCerts: true,
    chromeOptions: {
      args: ["headless"],
    },
  }
});
