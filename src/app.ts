import 'reflect-metadata';
import { container } from 'tsyringe';
import { Logger } from '@utils/logger';
import { RestServer } from '@infrastructure/rest';

void (async () => {
  try {
    const logger = container.resolve(Logger).logger;
    logger.info('[STARTUP] Config loaded and logger configured');

    // Setup Rest server
    const restServer = container.resolve(RestServer);
    await restServer.setupRest();
    logger.info('[STARTUP] Rest server started on port 8080');
  } catch (error) {
    try {
      const logger = container.resolve(Logger).logger;
      logger.error(error);
    } catch (unexpectedError) {
      // eslint-disable-next-line no-console
      console.error(unexpectedError);
    }
    process.exit(1);
  }
})();
