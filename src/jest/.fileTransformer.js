var Enzyme = require('enzyme');
var Adapter = require('enzyme-adapter-react-16.2');

Enzyme.configure({ adapter: new Adapter() });
// Mocks out a given file
const path = require('path')

module.exports = {
	process(src, filename) {
		return `module.exports = ${JSON.stringify(path.basename(filename))};`
	},
}
