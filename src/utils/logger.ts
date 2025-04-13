// eslint-disable-next-line import/no-named-as-default
import pino from 'pino';
import { singleton } from 'tsyringe';

/**
 * Log levels:
 * - trace: 10
 * - debug: 20
 * - info: 30
 * - warn: 40
 * - error: 50
 * - fatal: 60
 */

@singleton()
export class Logger {
  public logger: pino.Logger;

  constructor() {
    this.logger = pino({
      level: process.env.LOG_LEVEL ?? 'info',
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname'
        }
      }
    });
  }

  public trace(message: string | object, ...args: any[]): void {
    this.logger.trace(message, ...args);
  }

  public debug(message: string | object, ...args: any[]): void {
    this.logger.debug(message, ...args);
  }

  public info(message: string | object, ...args: any[]): void {
    this.logger.info(message, ...args);
  }

  public warn(message: string | object, ...args: any[]): void {
    this.logger.warn(message, ...args);
  }

  public error(message: string | object | Error, ...args: any[]): void {
    this.logger.error(message, ...args);
  }

  public fatal(message: string | object | Error, ...args: any[]): void {
    this.logger.fatal(message, ...args);
  }
}
