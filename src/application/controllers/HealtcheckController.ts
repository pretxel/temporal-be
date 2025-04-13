import { type FastifyReply, type FastifyRequest } from 'fastify';
import { injectable } from 'tsyringe';

@injectable()
class HealthCheckController {
  public healtCheck = async (request: FastifyRequest, reply: FastifyReply) => {
    return await reply.code(200).send({
      status: 'OK'
    });
  };
}

export default HealthCheckController;
