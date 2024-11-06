// console.js

const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '../../');
const console = path.join(src, 'frontend', 'console.html');

function route(req, res) {
	fs.readFile(console, 'utf8', (err, data) => {
		if (err) {
			return res.status(500).send('ise');
		}

		res.setHeader('Content-Type', 'text/html');
		res.send(data);
	});
}

module.exports = route;
