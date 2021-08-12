module.exports = () => ({
  launch_url: "https://staging-frontend.gousto.info",
  desiredCapabilities: {
    browserName: "chrome",
    acceptSslCerts: true,
    acceptInsecureCerts: true,
    chromeOptions: {
      args: ["headless"],
    },
  },
});
