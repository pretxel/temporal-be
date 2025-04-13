import { type FastifyInstance } from 'fastify';
import { container } from 'tsyringe';
import HealthCheckController from '@application/controllers/HealtcheckController';

const controller = container.resolve(HealthCheckController);

const HealthcheckRoute = async (server: FastifyInstance) => {
  server.get('/', controller.healtCheck);
};

export default HealthcheckRoute;
