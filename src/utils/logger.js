'use strict';
import fs from 'fs'
import winston from 'winston'
import 'winston-daily-rotate-file'

const logDir = 'srcLogs'

if ( !fs.existsSync( logDir ) ) {
	fs.mkdirSync( logDir )

}

export const logger = 
	new (winston.createLogger)({
		format: winston.format.combine(
            winston.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`+(info.splat!==undefined?`${info.splat}`:" "))
		), 
		transports: [
			new winston.transports.Console({
				timestamp: true,
				colorize : true,
			}),
			new winston.transports.DailyRotateFile({
				filename   : `${logDir}/info.log`,
				timestamp  : true,
                datePattern: 'YYYY-MM-DD',
                level 	   : 'info'
            }),

		]
	})