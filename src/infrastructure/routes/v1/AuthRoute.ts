import { FastifyInstance } from 'fastify';
import { AuthController } from '../../../application/controllers/AuthController';
import { container } from '@infrastructure/di';


const controller = container.resolve(AuthController);

const AuthRoute = async (server: FastifyInstance) => {

    server.post('/login', {
        schema: {
            body: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                    email: { type: 'string', format: 'email' },
                    password: { type: 'string', minLength: 6 }
                }
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        accessToken: { type: 'string' },
                        user: {
                            type: 'object',
                            properties: {
                                id: { type: 'number' },
                                email: { type: 'string' }
                            }
                        }
                    }
                },
                401: {
                    type: 'object',
                    properties: {
                        statusCode: { type: 'number' },
                        error: { type: 'string' },
                        message: { type: 'string' }
                    }
                }
            }
        }
    }, controller.login);
};

export default AuthRoute;