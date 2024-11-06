// index.js
const express = require('express');
const http = require('http');
const path = require('path');

const socket = require('./src/backend/socket');
const minecraft = require('./src/backend/process/minecraft');
const bungee = require('./src/backend/process/bungee');

const app = express();
const server = http.createServer(app);
const webserver = socket(server);

const PORT = 8006;
const SERVER_RAM_GB = 4;

// variables
let termination_mutex = false;
let process_minecraft;
let process_bungee;

// static
const static = path.join(__dirname, 'src', 'frontend', 'static');
app.use(express.static(static));

// routes
const route_index = require('./src/backend/routes/index');
const route_console = require('./src/backend/routes/console');
const middleware_console = require('./src/backend/routes/console-middleware');

app.get('/', route_index);

app.use('/console', middleware_console);
app.get('/console', route_console);

// nodejs exit
async function terminate() {
	if (termination_mutex) return;
	termination_mutex = true;

	console.log('');

	function promise_close(kill_function) {
		return new Promise((resolve) => {
			kill_function().then((response) => {
				console.log(response);
				resolve();
			}).catch((issue) => {
				console.log(`failed to kill process. (${issue})`);
				resolve();
			});
		});
	}

	async function kill_resources() {
		await Promise.all([
			promise_close(process_minecraft.kill),
			promise_close(process_bungee.kill),
			promise_close(webserver.kill)
		]);
	}

	// kill resources
	await kill_resources()
		.finally(() => {
			process.exit(0);
		});
}

// listen & websocket
webserver.wss.on('connection', (ws) => {
	var address = ws._socket.remoteAddress;
	if (!(address == '::1' || address == '::ffff:127.0.0.1')) {
		return ws.close();
	}

	ws.on('message', (message) => {
		try {
			const data = JSON.parse(message.toString());
			if (data.action == "send-command") {
				process_minecraft.send_command(data.value);
			} else if (data.action == "shutdown") {
				terminate();
			}
		} catch (issue) {
			// irrelevant
		}
	});
});

server.listen(PORT, () => {
	process_minecraft = minecraft( SERVER_RAM_GB, webserver.wss );
	process_bungee = bungee();

	console.log('------------------------------------------');
	console.log('Play Minecraft: http://0.0.0.0:8006/');
	console.log('Server IP: ws://0.0.0.0:8081/');
	console.log('------------------------------------------');
	console.log('Console Panel: http://localhost:8006/console');
	console.log('* The console panel is only accessible via localhost.');
	console.log('------------------------------------------');
});

process.on("SIGINT", terminate);
