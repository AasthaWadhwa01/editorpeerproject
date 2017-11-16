module.exports = {
   appenders: {
    everything: { type: 'file', filename: 'logs/logger.log' },
   	console: { type: 'console' }
  },
  categories: {
    default: { appenders: ['everything', 'console'], level: 'debug' }
  }

};
