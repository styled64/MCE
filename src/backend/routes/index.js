const fs = require('fs');
const path = require('path');

const frontend = path.join(__dirname, '../../frontend');
const minecraft = path.join(frontend, 'minecraft.html');

function route(req, res) {
	fs.readFile(minecraft, 'utf8', (err, data) => {
		if (err) {
			return res.status(500).send('ise');
		}

		res.setHeader('Content-Type', 'text/html');
		res.send(data);
	});
}

module.exports = route;
