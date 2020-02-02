import * as redis from 'redis';
import { Message } from './message';

export class Logger {
	public client: redis.RedisClient;
	public Message: Message;

	private service: string = String(process.env.SERVICE_NAME) || 'undefined';
	private host: string = String(process.env.REDIS_URL);
	private port: number = Number(process.env.REDIS_PORT);
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
			console.log(`LOGGER: Connection to redis at ${this.host}:${this.port} => successful`);
		});

		this.client.on('error', function(err) {
			console.log(`LOGGER: Connection to redis at ${this.host}:${this.port} => failed`);
		});
	}

	getMessages(sum, callback) {
		this.client.hgetall(this.collection, (e, data) => {
			if (e) console.log(e);

			callback(data);
		});
	}
}
