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

  public trace(obj: object, msg?: string, ...args: unknown[]): void;
  public trace(msg: string, ...args: unknown[]): void;
  public trace(objOrMsg: string | object, msgOrArgs?: string | unknown, ...args: unknown[]): void {
    if (typeof objOrMsg === 'string') {
      this.logger.trace(objOrMsg, ...(msgOrArgs ? [msgOrArgs, ...args] : args));
    } else {
      this.logger.trace(objOrMsg, msgOrArgs as string | undefined, ...args);
    }
  }

  public debug(obj: object, msg?: string, ...args: unknown[]): void;
  public debug(msg: string, ...args: unknown[]): void;
  public debug(objOrMsg: string | object, msgOrArgs?: string | unknown, ...args: unknown[]): void {
    if (typeof objOrMsg === 'string') {
      this.logger.debug(objOrMsg, ...(msgOrArgs ? [msgOrArgs, ...args] : args));
    } else {
      this.logger.debug(objOrMsg, msgOrArgs as string | undefined, ...args);
    }
  }

  public info(obj: object, msg?: string, ...args: unknown[]): void;
  public info(msg: string, ...args: unknown[]): void;
  public info(objOrMsg: string | object, msgOrArgs?: string | unknown, ...args: unknown[]): void {
    if (typeof objOrMsg === 'string') {
      this.logger.info(objOrMsg, ...(msgOrArgs ? [msgOrArgs, ...args] : args));
    } else {
      this.logger.info(objOrMsg, msgOrArgs as string | undefined, ...args);
    }
  }

  public warn(obj: object, msg?: string, ...args: unknown[]): void;
  public warn(msg: string, ...args: unknown[]): void;
  public warn(objOrMsg: string | object, msgOrArgs?: string | unknown, ...args: unknown[]): void {
    if (typeof objOrMsg === 'string') {
      this.logger.warn(objOrMsg, ...(msgOrArgs ? [msgOrArgs, ...args] : args));
    } else {
      this.logger.warn(objOrMsg, msgOrArgs as string | undefined, ...args);
    }
  }

  public error(obj: object | Error, msg?: string, ...args: unknown[]): void;
  public error(msg: string, ...args: unknown[]): void;
  public error(objOrMsg: string | object | Error, msgOrArgs?: string | unknown, ...args: unknown[]): void {
    if (typeof objOrMsg === 'string') {
      this.logger.error(objOrMsg, ...(msgOrArgs ? [msgOrArgs, ...args] : args));
    } else {
      this.logger.error(objOrMsg, msgOrArgs as string | undefined, ...args);
    }
  }

  public fatal(obj: object | Error, msg?: string, ...args: unknown[]): void;
  public fatal(msg: string, ...args: unknown[]): void;
  public fatal(objOrMsg: string | object | Error, msgOrArgs?: string | unknown, ...args: unknown[]): void {
    if (typeof objOrMsg === 'string') {
      this.logger.fatal(objOrMsg, ...(msgOrArgs ? [msgOrArgs, ...args] : args));
    } else {
      this.logger.fatal(objOrMsg, msgOrArgs as string | undefined, ...args);
    }
  }
}
