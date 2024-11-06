// bungee.js
const { spawn } = require('child_process');
const path = require('path');

const src = path.join(__dirname, '../../');

const bungee = path.join(src, 'environment', 'servers', 'bungee');
const bungee_jar = path.join(bungee, 'bungee.jar');

const get_java = require('../java');
const java_path = get_java(8);

function instance() {
	const process = spawn(java_path, ['-jar', bungee_jar], { cwd: bungee });

	async function kill() {
		process.kill();
		return "Bungee killed";
	}

	return {
		process: process,
		kill: kill
	}
}

module.exports = instance;
