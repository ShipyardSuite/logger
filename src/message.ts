import { RedisClient } from 'redis';

export class Message {
	private client: RedisClient;
	private collection: string;
	private service: string;
	private loglevel: string;

	constructor(client: RedisClient, collection: string, service: string) {
		this.client = client;
		this.collection = collection;
		this.service = service;
		this.loglevel = 'undefined';
	}

	info(data: object) {
		this.loglevel = 'info';
		this.setMessage(data);
	}

	debug(data: object) {
		this.loglevel = 'debug';
		this.setMessage(data);
	}

	warning(data: object) {
		this.loglevel = 'warning';
		this.setMessage(data);
	}

	error(data: object) {
		this.loglevel = 'error';
		this.setMessage(data);
	}

	setMessage(data: any) {
		data.timestamp = Math.floor(Date.now());
		data.loglevel = this.loglevel;
		data.service = this.service;

		this.client.hset(this.collection, JSON.stringify(data), data.service);
	}
}
