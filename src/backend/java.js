// java.js
const fs = require('fs');
const path = require('path');

const src__java_path = path.join(__dirname, '../', 'java')


function get_java(java_version) {
	const java_path = `${src__java_path}/java${java_version}/bin/java`

	if (fs.existsSync(java_path)) {
		return java_path;
	}

	console.warn(`Could not find java binary of version "${java_version}"`);
	return; 
}

module.exports = get_java;
