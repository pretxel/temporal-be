import { AuthService } from '../../core/service/AuthService';
import { FastifyReply, FastifyRequest } from 'fastify';
import { injectable, inject } from 'tsyringe';
import { LoginInput } from '../../core/domain/schema/AuthSchema';
import { Logger } from '../../utils/logger';

@injectable()
export class AuthController {
    constructor(
        @inject(AuthService) private readonly authService: AuthService,
        @inject(Logger) private readonly logger: Logger
    ) { }

    public login = async (
        request: FastifyRequest<{ Body: LoginInput }>,
        reply: FastifyReply
    ) => {
        const logger = this.logger;
        try {
            const { email, password } = request.body;

            logger.info({ email }, 'Login attempt');

            const result = await this.authService.login({ email, password });

            if (!result) {
                logger.warn({ email }, 'Login failed: Invalid credentials');
                return reply.status(401).send({
                    statusCode: 401,
                    error: 'Unauthorized',
                    message: 'Invalid email or password'
                });
            }

            // Sign the JWT token
            const token = await reply.jwtSign(JSON.parse(result.accessToken));

            logger.info({ email, userId: result.user.id }, 'Login successful');

            return reply.status(200).send({
                accessToken: token,
                user: result.user
            });
        } catch (error) {
            logger.error(error as Error, 'Login error');
            return reply.status(500).send({
                statusCode: 500,
                error: 'Internal Server Error',
                message: 'An error occurred during login'
            });
        }
    };
}

// export default AuthController; 