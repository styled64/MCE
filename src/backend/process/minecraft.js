// minecraft.js
const { spawn } = require('child_process');
const path = require('path');
const WebSocket = require('ws');

const src = path.join(__dirname, '../../');

const server = path.join(src, 'environment', 'servers', 'minecraft');
const server_jar = path.join(server, 'server.jar');

const get_java = require('../java');
const java_path = get_java(21);

function instance(GiB, wss) {
	const process = spawn(java_path, [`-Xmx${GiB}G`, `-Xms${GiB}G`, '-jar', server_jar], { cwd: server });

	function on_minecraft_log(message) {
		wss.clients.forEach(client => {
			function send_json_object(json) {
				var object = JSON.stringify(json);
				client.send(object);
			}

			if (client.readyState === WebSocket.OPEN) {
				send_json_object({
					action: "log-event",
					log: message
				});
			}
		});
	}

	process.stdout.on('data', (content) => {
		on_minecraft_log(content.toString());
	});

	process.stderr.on('data', (content) => {
		on_minecraft_log(content.toString());
	});

	function send_command(command) {
		process.stdin.write(command + '\n');
	}

	async function kill() {
		process.kill();
		return "Minecraft killed";
	}

	return {
		process: process,
		kill: kill,
		send_command: send_command
	}
}

module.exports = instance;
