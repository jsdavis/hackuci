const bunyan = require('bunyan');

const log = bunyan.createLogger({
    name: 'app',
    serializers: bunyan.stdSerializers,
    streams: [
        {
            level: 'info',
            stream: process.stdout
        },
        {
            level: 'error',
            type: 'rotating-file'
            path: path.join(__dirname, 'logs', 'error.log'),
            period: '1d',
            count: 7
        }
    ],
    src: process.env.NODE_ENV === 'production' ? false : true
});

module.exports = log;
