/* eslint-disable import/no-named-as-default */
import fastify, { type FastifyInstance, type FastifyReply } from 'fastify';
import multipart from '@fastify/multipart';
import { inject, singleton } from 'tsyringe';
import { Logger } from '../../utils/logger';
import fastifyEnv from '@fastify/env';
import fastifyJWT from '@fastify/jwt';
import cors from '@fastify/cors';
import '@infrastructure/di';
import { loggerMiddleware } from '../middleware/LoggerMiddleware';
// import * as AppRoutes from '../routes';
// import * as AppSchemas from '@application/schemas';

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: true,
  optionsSuccessStatus: 204,
  credentials: true
};

const schema = {
  type: 'object',
  required: ['SECRET_KEY'],
  properties: {
    SECRET_KEY: {
      type: 'string'
    }
  }
};

@singleton()
export class RestServer {
  private readonly fastifyInstance: FastifyInstance;

  constructor(
    @inject(Logger) private readonly logger: Logger
  ) {
    this.fastifyInstance = fastify({
      logger: false, // Disable built-in logger since we're using our own
      trustProxy: true
    });
  }

  // Initialize in a separate method


  // private registerSchemas(AppSchemas: any): void {
  //   for (const schema of [
  //    ]) {
  //     this.fastifyInstance.addSchema(schema);
  //   }
  // }

  private async registerRoutes(): Promise<void> {
    const { routes } = await import('@infrastructure/routes');

    for (const { route, prefix } of routes) {
      await this.fastifyInstance.register(route, { prefix });
    }
  }

  async setupRest(): Promise<void> {
    const myCustomMessages = {
      badRequestErrorMessage: 'Format is Authorization: Bearer [token]',
      noAuthorizationInHeaderMessage: 'Autorization header is missing!',
      authorizationTokenExpiredMessage: 'Authorization token expired',
      authorizationTokenInvalid: (err: any) => {
        return `Authorization token is invalid: ${err.message}`;
      }
    };

    const options = {
      confKey: 'config',
      schema,
      dotenv: true,
      data: process.env
    };

    // Disable logger because we want to avoid the default log of `.listen(...)`

    await this.fastifyInstance.register(cors, corsOptions);

    await this.fastifyInstance.register(multipart, {
      limits: {
        fieldSize: 8000000,
        fileSize: 8000000
      }
    });

    await this.fastifyInstance.register(fastifyEnv, options);

    await this.fastifyInstance.register(fastifyJWT, {
      secret: this.fastifyInstance.config.SECRET_KEY,
      messages: myCustomMessages,
      sign: {
        expiresIn: '4h'
      }
    });

    // this.fastifyInstance.decorate('authenticate', async (request: any, reply: FastifyReply) => {
    //   // try {
    //   //   const token = request.headers.authorization.replace('Bearer ', '');

    //   //   let profile;
    //   //   // Validate first in session BBDD
    //   //   const existToken = await this.sessionRepository.getByToken(token);
    //   //   if (!existToken) {
    //   //     profile = await auth0.getProfile(token);
    //   //     await this.sessionRepository.save({ token, profile });
    //   //   } else {
    //   //     profile = existToken.profile;
    //   //   }

    //   //   if (!profile) {
    //   //     return await reply.status(401).send({ error: 'No Auth' });
    //   //   }
    //   //   request.user = profile;
    //   // } catch (e: any) {
    //   //   console.log(e);
    //   //   return await reply.status(401).send({ error: e.message });
    //   // }

    //   try {
    //     await request.jwtVerify();
    //   } catch (e) {
    //     return await reply.send(e);
    //   }
    // });

    this.fastifyInstance.addHook('preHandler', (req, reply, next) => {
      req.jwt = this.fastifyInstance?.jwt;
      next();
    });

    // Add logger middleware
    this.fastifyInstance.addHook('preHandler', loggerMiddleware);

    // this.registerSchemas(AppSchemas);

    // Register public and private routes
    await this.registerRoutes();

    // Start server
    const port = process.env.PORT ?? 8080;
    await this.fastifyInstance.listen({ port: parseInt(port as string), host: '0.0.0.0' });

    // Re-setup logger in order to have log for each request
    this.fastifyInstance.log = this.logger.logger;
  }

  async closeRestServer(): Promise<void> {
    if (!this.fastifyInstance) {
      return;
    }

    await this.fastifyInstance.close();
  }
}
