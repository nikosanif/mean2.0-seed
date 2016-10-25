module.exports = {
	environment: 'development',
	url: 'http://localhost:8000',
	express: {
		hostName: 'localhost',
		port: 8000,
		ip: '127.0.0.1'
	},
	db: {
		host: 'localhost',
		name: 'mean2-seed-dev',
		port: '27017'
	},
	nodemon:{
		debugPort: 5858
	}
};
