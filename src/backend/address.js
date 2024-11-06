// address.js
const os = require('os');

function get_address() {
	const interfaces = os.networkInterfaces();

	for (const name of Object.keys(interfaces)) {
		for (const interface of interfaces[name]) {
			if (interface.family !== 'IPv4' || interface.internal !== false) {
				continue
			}

			return interface.address;
		}
	}
}

module.exports = get_address;
