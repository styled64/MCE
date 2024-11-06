// socket.js
const WebSocket = require('ws');

function instance(server) {
	const wss = new WebSocket.Server({ server });

	async function kill() {
		wss.clients.forEach(client => {
			if (client.readyState === WebSocket.OPEN) {
				client.close();
			}
		});

		wss.close();
		return "WebSocket killed";
	}

	return {
		wss: wss,
		kill: kill
	}
}

module.exports = instance;
