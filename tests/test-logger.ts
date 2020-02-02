import { Logger } from './../index';

const logger = new Logger();
logger.Message.debug({ path: '/' });
logger.Message.debug({ path: '/', action: 'test' });
logger.Message.debug({ path: '/', user: 'admin' });

logger.getMessages(0, (messages: any) => {
	console.log(messages);
});
