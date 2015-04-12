var logger = require('../index.js')

var log = new logger({some:"metadata"}, true)

log.info('OK')
