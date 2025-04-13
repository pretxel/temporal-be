import { FastifyReply, FastifyRequest } from "fastify";
import { injectable } from "tsyringe";
import { version } from '../../../package.json';

@injectable()
export class VersionController {
    public versionCheck = async (
        request: FastifyRequest,
        reply: FastifyReply
    ) => {
        return await reply.code(200).send({
            version
        });
    };
}

export default VersionController;