module.exports = () => ({
  launch_url: 'https://fef-frontend.gousto.info',
  desiredCapabilities: {
    browserName: "chrome",
    acceptSslCerts: true,
    acceptInsecureCerts: true,
    chromeOptions: {
      args: ["headless"],
    },
  },
})
//TODO MUST Point to the frontend using https to be a real customer e2e test
