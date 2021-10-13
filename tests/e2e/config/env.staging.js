module.exports = () => ({
  launch_url: "https://stagingdr-frontend.gousto.info",
  desiredCapabilities: {
    browserName: "chrome",
    acceptSslCerts: true,
    acceptInsecureCerts: true,
    chromeOptions: {
      args: ["headless"],
    },
  },
});
