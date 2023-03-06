const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');
const morgan = require('morgan');

const express = require('express'); // Web server
const sirv = require('sirv'); // Static file middleware
const session = require('express-session'); // Session storage middleware
const MemoryStore = require('memorystore')(session); // express-session local storage middleware
const log = require('another-logger'); // Logging utility
const config = require('../../config');


// Routes for non-frontend things
const api = require('./routes/api');

const indexPage = fs.readFileSync(path.join(config.publicDir, 'index.html'));

// Define the main application
const app = express({
	// Send the vue application for any route that isn't an API route, rendering a Not Found page if needed.
	onNoMatch: (request, response) => response.end(indexPage),
});

// Set up global middlewares
app.use(
	// Logging
	morgan('dev'),
	// Session storage
	session({
		secret: config.session.secret,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 72 * 60 * 60 * 1000,
		},
		store: new MemoryStore({
			checkPeriod: 86400000, // prune expired entries every 24h
		}),
	}),
	// Static assets
	sirv(config.publicDir, {
		dev: true, // Turn off dev mode in prod
		brotli: true,
	}),
);

// Register the API routes and auth routes
app.use('/api', api);

// Start the server
if (config.https) {
	// If we're using HTTPS, create an HTTPS server
	const httpsOptions = {
		key: config.https.key,
		cert: config.https.cert,
	};
	const httpsApp = https.createServer(httpsOptions, app.handler);
	httpsApp.listen(config.https.port, () => {
		log.success(`HTTPS listening on port ${config.https.port}`);
	});
	// The HTTP server will just redirect to the HTTPS server
	http.createServer((req, res) => {
		res.writeHead(301, {Location: `https://${req.headers.host}${req.url}`});
		res.end();
	}).listen(config.port, () => {
		log.success(`HTTP redirect listening on port ${config.port}`);
	});
} else {
	app.listen(config.port, () => {
		log.success(`Listening on port ${config.port}~!`);
	});
}
