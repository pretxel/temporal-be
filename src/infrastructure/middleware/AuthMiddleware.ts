import { type FastifyReply, type FastifyRequest } from 'fastify';

/**
 * Authentication middleware that verifies JWT token
 * @param request FastifyRequest
 * @param reply FastifyReply
 */
export const authMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    // This will automatically verify the token using @fastify/jwt
    await request.jwtVerify();
  } catch (err) {
    await reply.status(401).send({
      statusCode: 401,
      error: 'Unauthorized',
      message: 'Invalid or expired token'
    });
  }
};
