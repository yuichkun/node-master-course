const handlers = {
	ping(data, callback){
		callback(200);	
	},
	notFound(data, callback){
		callback(404);
	}
};

const router = {
	ping: handlers.ping
};

module.exports = {
	handlers,
	router
};
