import { createLogger, format, transports } from "winston";
import moment from 'moment';

export const Logger = createLogger({
    format: format.combine(
        format.simple(),
        format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
        format.prettyPrint(),
        format.printf(info => `[${info.timestamp}]${info.level} - ${info.message}`),
    ),
    transports: [
        new transports.File({
            filename: `./logs/API${moment().utc().format('DDMMYYYY')}.log`,
            maxsize: 200000000,
            handleExceptions: true,
        }),
    ],
    exitOnError: false,
});