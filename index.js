"use strict";

var convar           = require('convar')
  , env              = convar('node_env') || 'development'
  , Winston          = require('winston')
;



function CeoLogger(meta, forceJson) {
  var ceoLogger = this
    , metaData      = meta
    , config        = convar('ceo-logger') || {}
    , SysLog        = config.syslog     || convar('syslog')
    , LogEntries    = config.logentries || convar('logentries')
    , Loggly        = config.loggly     || convar('logly')
    , Riak          = config.riak       || convar('riak')
    , MongoDB       = config.mongodb    || convar('mongodb')
    , SimpleDB      = config.simpledb   || convar('simpledb')
    , ForceJson     = config.forceJson  || forceJson
    , logLevels = { // syslog log levels
        debug:   0, // debug-level message
        info:    1, // informational message
        notice:  2, // normal, but significant, condition
        warning: 3, // warning conditions
        error:   4, // error conditions
        crit:    5, // critical conditions
        alert:   6, // action must be taken immediately
        emerg:   7  // system is unusable
      }
    , transports = [ new Winston.transports.Console({ handleExceptions: true, json: ForceJson }) ]
  ;

  function add(logr, options) {
    if (ForceJson) options.json = true
    var Logr = new logr(options)
    transports.push(Logr)
  }

  if (SysLog)     add(require('winston-syslog').Syslog,     SysLog)
  if (LogEntries) add(require('winston-logentries-transport').Logentries, LogEntries)
  if (Loggly)     add(require('winston-loggly').Loggly,     Loggly)
  if (Riak)       add(require('winston-riak').Riak,         Riak)
  if (MongoDB)    add(require('winston-mongodb').MongoDB,   MongoDB)
  if (SimpleDB)   add(require('winston-simpledb').SimpleDB, SimpleDB)

  var winston = new Winston.Logger({
    transports:  transports,
    exitOnError: false
  })

  winston.setLevels(logLevels)

  ceoLogger.debug   = function(message) { winston.debug(message,   metaData) }
  ceoLogger.info    = function(message) { winston.info(message,    metaData) }
  ceoLogger.notice  = function(message) { winston.notice(message,  metaData) }
  ceoLogger.warning = function(message) { winston.warning(message, metaData) }
  ceoLogger.err     = function(message) { winston.err(message,     metaData) }
  ceoLogger.crit    = function(message) { winston.crit(message,    metaData) }
  ceoLogger.alert   = function(message) { winston.alert(message,   metaData) }
  ceoLogger.emerg   = function(message) { winston.emerg(message,   metaData) }

  // matching aliases
  ceoLogger.information = function(message) { winston.info(message,    metaData) } // informational message
  ceoLogger.warn        = function(message) { winston.warning(message, metaData) } // warning conditions
  ceoLogger.error       = function(message) { winston.err(message,     metaData) } // error conditions
  ceoLogger.critical    = function(message) { winston.crit(message,    metaData) } // critical conditions
  ceoLogger.emergency   = function(message) { winston.emerg(message,   metaData) } // system is unusable

  // remapped alternatives
  ceoLogger.trace   = function(message) { winston.debug(message,   metaData) } // debug-level message
  ceoLogger.silly   = function(message) { winston.debug(message,   metaData) } // debug-level message
  ceoLogger.verbose = function(message) { winston.info(message,    metaData) } // informational message

  return ceoLogger
}



module.exports = CeoLogger
