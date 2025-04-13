import { describe, it, expect, beforeEach } from 'vitest';
import HealthCheckController from '../../src/application/controllers/HealtcheckController';
import { mockDeep, mockReset, type DeepMockProxy } from 'vitest-mock-extended';
import { type FastifyRequest, type FastifyReply } from 'fastify';

describe('HealthCheckController', () => {
  let controller: HealthCheckController;
  let requestMock: DeepMockProxy<FastifyRequest>;
  let replyMock: DeepMockProxy<FastifyReply>;

  beforeEach(() => {
    controller = new HealthCheckController();

    // Create mocks for Fastify request and reply
    requestMock = mockDeep<FastifyRequest>();
    replyMock = mockDeep<FastifyReply>();

    // Reset mocks between tests
    mockReset(requestMock);
    mockReset(replyMock);

    // Setup reply chain methods
    replyMock.code.mockReturnValue(replyMock);
    replyMock.send.mockReturnValue(replyMock);
  })

  it('should return status OK with 200 status code', async () => {
    await controller.healtCheck(requestMock, replyMock);

    expect(replyMock.code).toHaveBeenCalledWith(200);
    expect(replyMock.send).toHaveBeenCalledWith({ status: 'OK' });
  })
});
