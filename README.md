# logger
Custom logger for Shipyard GCDN

# Usage
Install via `npm install @shipyardsuite/logger`.

the logger needs the following environment variables to run:
- SERVICE_NAME: Name of service, the logger belongs to, defaults to "undefined"
- REDIS_URL: URL of redis database/image.
- REDIS_PORT: Port of redis database.
- REDIS_PASSWORD: Password of redis database.
- REDIS_COLLECTION: Name of redis collection to save logs in, default is 'logs'

## License
This project is released under the [Apache version 2](LICENSE) license.