// Ensure we're in the project directory, so relative paths work as expected
global._ = require('lodash');
process.chdir(__dirname);

require("./app/server/server.js").run(function (err) {
	if (err) {
		process.exit(10);
	}
});

