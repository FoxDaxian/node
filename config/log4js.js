const path = require('path')
module.exports = {
    appenders: {
        console: {
            type: "console"
        },
        access: {
            type: "datefile",
            filename: path.resolve(__dirname, '../log/access'),
            pattern: "-yyyy-MM-dd.log",
            alwaysIncludePattern: true,
            backups: 10
        },
        error: {
            type: "datefile",
            filename: path.resolve(__dirname, '../log/error'),
            pattern: "-yyyy-MM-dd.log",
            alwaysIncludePattern: true,
            backups: 10
        }
    },
    categories: {
        default: { appenders: [ 'console' ], level: 'debug' },
        access: { appenders: [ 'access' ], level: 'info' },
        error: { appenders: [ 'error' ], level: 'error' }
    }
}
