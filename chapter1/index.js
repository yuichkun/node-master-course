//libs
const config = require('./config');
const { router, handlers } = require('./routes');

//Modules
const http = require('http');
const https = require('https');
const url = require('url');
const fs = require('fs');
const { StringDecoder } = require('string_decoder');

//HTTP Server
const httpServer = http.createServer(app);
httpServer.listen(config.httpPort, ()=>{
	console.log(`http server running on ${config.httpPort} in ${config.envName} mode`);
});


//HTTPS Server
const opts = {
	'key': fs.readFileSync('./https/key.pem'),
	'cert': fs.readFileSync('./https/cert.pem')
};
const httpsServer = https.createServer(opts, app);
httpsServer.listen(config.httpsPort, ()=>{
	console.log(`http server running on ${config.httpsPort} in ${config.envName} mode`);
});

function app(req, res){
	const { headers } = req;
	const method = req.method.toUpperCase();
	const parsedURL = url.parse(req.url, true);
	const { query, pathname: path } = parsedURL;
	const trimed = path.replace(/^\/+|\/+$/g, '');

	const decoder = new StringDecoder('utf-8');
	let buffer= '';
	req.on('data', (data)=>{
		buffer += decoder.write(data);
	});
	req.on('end', ()=>{
		buffer += decoder.end();
		const chosenHandler = typeof(router[trimed]) !== 'undefined' ? router[trimed] : handlers.notFound; 
		const data = {
			trimed,
			query,
			method,
			headers,
			payload: buffer
		};

		chosenHandler(data, function(statusCode, payload){
			statusCode = typeof(statusCode) === 'number' ? statusCode : 200;
			payload = typeof(payload) === 'object' ? payload : {};
			res.setHeader('Content-Type', 'application/json');
			res.writeHead(statusCode);
			res.end(JSON.stringify(payload));
			console.log('Returning ' + statusCode + ' ' + JSON.stringify(payload));
		});

	});
};
