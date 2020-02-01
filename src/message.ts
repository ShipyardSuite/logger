import { RedisClient } from 'redis';

export class Message {
	private client: RedisClient;
	private collection: string;
	private loglevel: string;
	private service: string;

	constructor(client: RedisClient, collection: string, service: string) {
		this.client = client;
		this.collection = collection;
		this.service = service;
	}

	info(data: object) {
		this.loglevel = 'info';
		this.setMessage(data);
	}

	debug(data: object) {
		this.loglevel = 'debug';
		this.setMessage(data);
	}

	warn(data: object) {
		this.loglevel = 'warn';
		this.setMessage(data);
	}

	error(data: object) {
		this.loglevel = 'error';
		this.setMessage(data);
	}

	setMessage(data) {
		data.timestamp = Math.floor(Date.now());
		data.loglevel = this.loglevel;
		data.service = this.service;

		this.client.hset(this.collection, JSON.stringify(data), data.service);
	}
}
