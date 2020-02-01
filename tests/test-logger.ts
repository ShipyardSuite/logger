import { Logger } from './../src';

const logger = new Logger();
logger.Message.debug({ path: '/' });
logger.Message.debug({ path: '/', action: 'test' });
logger.Message.debug({ path: '/', user: 'admin' });

logger.getMessages(0, (messages) => {
	console.log(messages);
});
