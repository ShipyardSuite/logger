import { RedisClient } from 'redis';
import 'colorts/lib/string';

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

	info(data: object, callback: any = () => {}) {
		this.loglevel = 'info';
		this.setMessage(data, (message: any) => {
			callback(this.displayMessage(message));
		});
	}

	debug(data: object, callback: any = () => {}) {
		this.loglevel = 'debug';
		this.setMessage(data, (message: any) => {
			callback(this.displayMessage(message));
		});
	}

	warning(data: object, callback: any = () => {}) {
		this.loglevel = 'warning';
		this.setMessage(data, (message: any) => {
			callback(this.displayMessage(message));
		});
	}

	error(data: object, callback: any = () => {}) {
		this.loglevel = 'error';
		this.setMessage(data, (message: any) => {
			callback(this.displayMessage(message));
		});
	}

	setMessage(data: any, callback: any = () => {}) {
		data.timestamp = Math.floor(Date.now());
		data.loglevel = this.loglevel;
		data.service = this.service;

		this.client.hset(this.collection, JSON.stringify(data), data.service);

		callback(data);
	}

	displayMessage(message: any) {
		const messageTimestamp = new Date(message.timestamp).toLocaleString();
		const messageService = message.service ? 'SERVICE: ' + message.service : '';
		const messagePath = message.path ? 'PATH: ' + message.path : '';
		const messageUser = message.user ? ' - USER: ' + message.user : '';
		const messageAction = message.action ? ' - ACTION: ' + message.action : '';

		let newMessage = `${messageTimestamp} - ${messageService} - ${messagePath}${messageUser}${messageAction}`;

		switch (message.loglevel) {
			case 'info':
				newMessage = newMessage.green;
				break;
			case 'debug':
				newMessage = newMessage.white;
				break;
			case 'warning':
				newMessage = newMessage.yellow;
				break;
			case 'error':
				newMessage = newMessage.red;
				break;
		}

		return newMessage;
	}
}
