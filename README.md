# logger
Custom logger for Shipyard GCDN

# Installation
Install via `npm install @shipyardsuite/logger`.

the logger needs the following environment variables to run:
- SERVICE_NAME: Name of service, the logger belongs to, defaults to "undefined"
- REDIS_URL: URL of redis database/image.
- REDIS_PORT: Port of redis database.
- REDIS_PASSWORD: Password of redis database.
- REDIS_COLLECTION: Name of redis collection to save logs in, default is 'logs'

# Initialization:
`import { Logger } from '@shipyardsuite/logger';`

# Usage
create a new instane of the logger with:

 `const logger = new Logger();`

the following types of log-messages can be created:

`Message.info()`

`Message.debug()`

`Message.warning()`

`Message.error()`

The logger can take a javascript object for logging informations, for example:

```javascript
logger.Message.debug({ 
    action: 'Testing server', 
    port: this.port 
});
```

the output will automatically serve the following informations:

- timestamp: Current timestamp of log.
- loglevel: Level of log, i.e. info, debug, warning, error
- service: The name of the currently running service.


## License
This project is released under the [Apache version 2](LICENSE) license.