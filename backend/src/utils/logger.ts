import Env from "@/utils/env";
import { DateTime } from "luxon";
import { createLogger, format, transports } from "winston";

// https://github.com/winstonjs/winston#logging
// { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }

const Logger = createLogger({
  level: Env.LOG_LEVEL ?? `debug`,
  transports: [new transports.Console()],
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.align(),
    format.errors({ stack: true, colorize: true, prettyPrint: true }),
    format.printf(({ timestamp, level, message }) => {
      return `${DateTime.fromISO(timestamp as string).toFormat(
        `yyyy-MM-dd HH:mm:ss`
      )} ${level}${message}`;
    })
  ),
  defaultMeta: {
    service: `_winston_logger_`,
  },
});

export default Logger;
