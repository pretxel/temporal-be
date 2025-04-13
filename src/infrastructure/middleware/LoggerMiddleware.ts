import { type FastifyRequest, type FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { Logger } from '../../utils/logger';

/**
 * Middleware for logging all incoming requests and their responses
 */
export const loggerMiddleware = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const logger = container.resolve(Logger).logger;
  const startTime = process.hrtime();

  // Create a child logger with request-specific data
  const reqLogger = logger.child({
    requestId: request.id,
    method: request.method,
    url: request.url,
    path: request.url,
    ip: request.ip,
    userAgent: request.headers['user-agent']
  });

  // Log the incoming request
  reqLogger.info('Request received');

  // Add the logger to the request for use in route handlers
  request.log = reqLogger;

  // Set up response logging using onResponse hook
  reply.raw.on('finish', () => {
    // Calculate request duration
    const hrDuration = process.hrtime(startTime);
    const durationMs = hrDuration[0] * 1000 + hrDuration[1] / 1000000;

    // Log the response
    reqLogger.info(
      {
        statusCode: reply.statusCode,
        durationMs: durationMs.toFixed(2)
      },
      'Request completed'
    );
  })
};
