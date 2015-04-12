# ceo-logger
Auto configuring Winston logger supporting logentries, loggly, mongo, riak, simpledb, syslog and defaulting to console

## Install

```sh
npm i ceo-logger --save
```

## Basic Usage
ÒÂÂ
```basic.js``` example

```js
var log = require('ceo-logger');
log.info('It Logs') // defaults to console
```

## CLI Usage

```sh
node basic.js --logentries LogEntriesKey
# 'It Logs' goes to LogEntries
```

or via environment variable

```sh
logentries=LogEntriesKey

node basic.js
# 'It Logs' goes to LogEntries
```

## Send to multiple places

```sh
logentries=LogEntriesKey
loggly=LogglyKey
mongo=MongoConnectString

node basic.js
# 'It Logs' goes to LogEntries, Loggly and MongoDb
```

or config as JSON

```sh
node basic.js --ceo-logger '{"logentries":"key", "loggly":"key", "mongo":"connectionString"}'
# 'It Logs' goes to LogEntries, Loggly and MongoDb
```

or config as JSONIC

```sh
node basic.js --ceo-logger 'logentries:key,loggly:key'
# 'It Logs' goes to LogEntries and Loggly
```

## Log Functions and Alias

In order to maximize compatibility the following are supported

```js
log.debug   = winston.debug(message)
log.info    = winston.info(message)
log.notice  = winston.notice(message)
log.warning = winston.warning(message)
log.err     = winston.err(message)
log.crit    = winston.crit(message)
log.alert   = winston.alert(message)
log.emerg   = winston.emerg(message)

// matching aliases
log.information = winston.info(message) // informational message
log.warn        = winston.warning(message) // warning conditions
log.error       = winston.err(message) // error conditions
log.critical    = winston.crit(message) // critical conditions
log.emergency   = winston.emerg(message) // system is unusable

// remapped alternatives
log.trace   = winston.debug(message) // debug-level message
log.silly   = winston.debug(message) // debug-level message
log.verbose = winston.info(message) // informational message
```

## License MIT
