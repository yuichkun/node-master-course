const environments = {
	staging : {
		httpPort: 3000,
		httpsPort: 3001,
		envName: 'staging'
	},
	production : {
		httpPort: 5000,
		httpsPort: 5001,
		envName: 'production'
	}
};


const { NODE_ENV } = process.env;
const currentEnv = typeof(NODE_ENV) === 'string' ? NODE_ENV.toLowerCase() : '';

const exportEnv = typeof(environments[currentEnv]) === 'object' ? environments[currentEnv] : environments.staging;

module.exports = exportEnv;
