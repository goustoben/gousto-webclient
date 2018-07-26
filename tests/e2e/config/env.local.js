module.exports = ({ BINPATH }) => ({
	launch_url: 'http://frontend-new.gousto.local',
	selenium_host: '127.0.0.1',
	selenium: {
		start_process: true,
		server_path: BINPATH + 'selenium.jar'
	}
})
