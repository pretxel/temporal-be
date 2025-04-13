import { type ServerResponse, type IncomingMessage, type Server } from 'http';

declare module 'fastify' {
  export interface FastifyInstance<HttpServer = Server, HttpRequest = IncomingMessage, HttpResponse = ServerResponse> {
    verifyJWT(): void;
    jwt: JWT;
    authenticate: any;
    config: any;
  }

  export interface FastifyRequest {
    verifyJWT(): void;
    jwt: JWT;
  }
}
