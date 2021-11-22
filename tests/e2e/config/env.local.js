const axios = require("axios")

module.exports = ({ BINPATH }) => ({
  globals: {
    before: function(done) {
      axios.delete('http://localhost:3000/_config/emulated-paths').then(done).catch(console.error)
    }
  },
  launch_url: "http://frontend.gousto.local:8080",
});
