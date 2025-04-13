import { container } from 'tsyringe';
import { Logger } from '../logger';

// Example of how to use the Logger in your application

// Get the logger instance from the container
const logger = container.resolve(Logger).logger;

// Basic usage examples
logger.trace('This is a trace message');
logger.debug('This is a debug message');
logger.info('This is an info message');
logger.warn('This is a warning message');
logger.error('This is an error message');
logger.fatal('This is a fatal message');

// With additional context
logger.info({ userId: 123 }, 'User logged in');

// With error objects
try {
  throw new Error('Something went wrong');
} catch (error) {
  logger.error(error, 'Error occurred during operation');
}

// Structured logging with child loggers
const requestLogger = logger.child({ requestId: 'req-123', userId: 456 });
requestLogger.info('Processing request');

// Using in a class with dependency injection
class UserService {
  constructor(private readonly logger: Logger) {}

  createUser(userData: { email: string; name: string }) {
    this.logger.info({ action: 'createUser', ...userData }, 'Creating new user');
    // ... user creation logic
    this.logger.info({ userId: 789 }, 'User created successfully');
  }
}

// Register and use the service
container.registerSingleton(UserService);
const userService = container.resolve(UserService);
userService.createUser({ email: 'user@example.com', name: 'John Doe' });
