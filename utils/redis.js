import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
	constructor() {
		this.client = redis.createClient();

		//Handling exception for creating client instance
		this.client.on('error', (err) => {
			console.error(`Redis client error: ${err}`);
		});
	}
	isAlive() {
		return this.client.isConnected();
	}

	async get(key) {
		const getAsync = promisify(this.client.get).bind(this.client);
		return getAsync(key);
	}

	async set(key, value, duration) {
		const setAsync = promisify(this.client.setex).bind(this.client);
		return setAsync(key, value, duration);
	}

	async del(key) {
		const delAsync = promisify(this.client.del).bind(this.client);
		return delAsync(key);
	}
}

//Makin the class accessible globally
const redisClient = new RedisClient();
module.exports = redisClient;
