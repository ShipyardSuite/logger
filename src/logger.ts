import * as redis from 'redis';
import { Message } from './message';

export default class Logger {
	public client: redis.RedisClient;
	public Message: Message;

	private service: string = String(process.env.SERVICE_NAME) || 'undefined';
	private host: string = String(process.env.REDIS_URL) || 'localhost';
	private port: number = Number(process.env.REDIS_PORT) || 6379;
	private password: string = String(process.env.REDIS_PASSWORD);
	private collection: string = String(process.env.REDIS_COLLECTION) || 'logs';

	constructor() {
		this.client = redis.createClient({
			host: this.host,
			port: this.port,
			no_ready_check: true,
			password: this.password
		});

		this.Message = new Message(this.client, this.collection, this.service);

		this.client.on('connect', () => {
			console.log(`LOGGER: Connection to redis successful`);
		});

		this.client.on('error', function(err) {
			console.log(`LOGGER: Connection to redis failed`);
		});
	}

	getMessages(callback: any) {
		this.client.hgetall(this.collection, (e, data: any) => {
			if (e) console.log(e);

			callback(data);
		});
	}
}
