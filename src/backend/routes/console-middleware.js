// console-middleware.js

function middleware(req, res, next) {
	const ip = req.ip || req.connection.remoteAddress;

	if (ip == '::1' || ip == '::ffff:127.0.0.1') {
		next();
	} else {
		return res.status(403)
	}
}

module.exports = middleware;
