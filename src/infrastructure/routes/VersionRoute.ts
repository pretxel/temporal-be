import { type FastifyInstance } from 'fastify';
import { container } from 'tsyringe';
import VersionController from '@application/controllers/VersionController';

const controller = container.resolve(VersionController);

const VersionRoute = async (server: FastifyInstance) => {
  server.get('/', controller.versionCheck);
};

export default VersionRoute;
