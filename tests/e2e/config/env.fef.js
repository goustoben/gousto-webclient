module.exports = ({ BINPATH }) => ({
  launch_url: 'https://fef-frontend.gousto.info',
  selenium_host: 'fef-selenium.gousto.info',
  selenium: {
    start_process: true,
    server_path: BINPATH + 'selenium.jar'
  }
})
