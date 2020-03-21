import { Logger } from './../index';

let testMessages;

const logger = new Logger();
logger.Message.info({ path: '/' }, (message: any) => {
	console.log(message);
});
logger.Message.warning({ path: '/', action: 'test' }, (message: any) => {
	console.log(message);
});
logger.Message.warning({ path: '/', action: 'Hello World' });
logger.Message.error({ path: '/', action: 'test' }, (message: any) => {
	console.log(message);
});
logger.Message.debug({ path: '/', user: 'admin', action: 'test' });

logger.getMessages((messages: any) => {
	testMessages = messages;
});
