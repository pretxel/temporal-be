import { describe, it, expect, beforeEach } from 'vitest'
import VersionController from '../../src/application/controllers/VersionController'
import { mockDeep, mockReset, DeepMockProxy } from 'vitest-mock-extended'
import { FastifyRequest, FastifyReply } from 'fastify'
import { version } from '../../package.json'

describe('VersionController', () => {
    let controller: VersionController
    let requestMock: DeepMockProxy<FastifyRequest>
    let replyMock: DeepMockProxy<FastifyReply>

    beforeEach(() => {
        controller = new VersionController()

        // Create mocks for Fastify request and reply
        requestMock = mockDeep<FastifyRequest>()
        replyMock = mockDeep<FastifyReply>()

        // Reset mocks between tests
        mockReset(requestMock)
        mockReset(replyMock)

        // Setup reply chain methods
        replyMock.code.mockReturnValue(replyMock)
        replyMock.send.mockReturnValue(replyMock)
    })

    it('should return version with 200 status code', async () => {
        await controller.versionCheck(requestMock, replyMock)

        expect(replyMock.code).toHaveBeenCalledWith(200)
        expect(replyMock.send).toHaveBeenCalledWith({ version })
    })
}) 