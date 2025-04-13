import { type FastifyInstance } from 'fastify';
import { authMiddleware } from '../../middleware/AuthMiddleware';

const routes = async (server: FastifyInstance) => {
  // Apply the auth middleware to all routes in this plugin
  server.addHook('preHandler', authMiddleware);

  // Login routes can be imported from AuthRoute.ts

  // Get the current user's profile (from JWT token)
  server.get('/me', async (request, reply) => {
    try {
      // The user data is already verified and available from the JWT
      // Cast to the expected type for TypeScript
      const user = request.user as { id: number; email: string };

      return reply.status(200).send({
        id: user.id,
        email: user.email
      });
    } catch (error) {
      request.log.error(error as Error);
      return reply.status(500).send({
        statusCode: 500,
        error: 'Internal Server Error',
        message: 'An error occurred while retrieving user profile'
      });
    }
  });
};

export default routes;
