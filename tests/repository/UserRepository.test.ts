import { describe, it, expect, beforeEach } from 'vitest'
import { UserRepository } from '../../src/infrastructure/repository/UserRepository'
import { mockDeep, mockReset, DeepMockProxy } from 'vitest-mock-extended'
import { Prisma } from '../../src/utils/prisma'
import { User } from '../../src/core/domain/User'

describe('UserRepository', () => {
    let repository: UserRepository
    let prismaMock: DeepMockProxy<Prisma>

    beforeEach(() => {
        // Create a deep mock of the Prisma instance
        prismaMock = mockDeep<Prisma>()

        // Reset mock between tests
        mockReset(prismaMock)

        // Create repository with the mock
        repository = new UserRepository(prismaMock)
    })

    describe('findById', () => {
        it('should return null when user not found', async () => {
            // Setup
            prismaMock.client.user.findUnique.mockResolvedValue(null)

            // Execute
            const result = await repository.findById(1)

            // Verify
            expect(result).toBeNull()
            expect(prismaMock.client.user.findUnique).toHaveBeenCalledWith({
                where: { id: 1 },
                include: { Mentee: true }
            })
        })

        it('should return mapped user when found', async () => {
            // Setup
            const mockUser = {
                id: 1,
                email: 'test@example.com',
                name: 'John',
                password: 'hashedpassword',
                salt: 'salt',
                Mentee: null
            }

            prismaMock.client.user.findUnique.mockResolvedValue(mockUser)

            // Execute
            const result = await repository.findById(1)

            // Verify
            expect(result).toBeInstanceOf(User)
            expect(result?.id).toBe(1)
            expect(result?.email).toBe('test@example.com')
            expect(prismaMock.client.user.findUnique).toHaveBeenCalledWith({
                where: { id: 1 },
                include: { Mentee: true }
            })
        })
    })

    describe('findByEmail', () => {
        it('should return null when user not found', async () => {
            // Setup
            prismaMock.client.user.findUnique.mockResolvedValue(null)

            // Execute
            const result = await repository.findByEmail('email@test.com')

            // Verify
            expect(result).toBeNull()
            expect(prismaMock.client.user.findUnique).toHaveBeenCalledWith({
                where: { email: 'email@test.com' },
                include: { Mentee: true }
            })
        })

        it('should return mapped user when found', async () => {
            // Setup
            const mockUser = {
                id: 1,
                email: 'test@example.com',
                password: 'hashedpassword',
                salt: 'salt',
                Mentee: null
            }

            prismaMock.client.user.findUnique.mockResolvedValue(mockUser)

            // Execute
            const result = await repository.findByEmail('test@example.com')

            // Verify
            expect(result).toBeInstanceOf(User)
            expect(result?.id).toBe(1)
            expect(result?.email).toBe('test@example.com')
            expect(prismaMock.client.user.findUnique).toHaveBeenCalledWith({
                where: { email: 'test@example.com' },
                include: { Mentee: true }
            })
        })
    })

    describe('create', () => {
        it('should create and return a new user', async () => {
            // Setup
            const newUser = {
                email: 'jane@example.com',
                password: 'password123',
                salt: 'salt123'
            }

            const mockCreatedUser = {
                id: 2,
                email: 'jane@example.com',
                password: 'password123',
                salt: 'salt123',
                Mentee: null
            }

            prismaMock.client.user.create.mockResolvedValue(mockCreatedUser)

            // Execute
            const result = await repository.create(newUser)

            // Verify
            expect(result).toBeInstanceOf(User)
            expect(result.id).toBe(2)
            expect(result.email).toBe('jane@example.com')
            expect(prismaMock.client.user.create).toHaveBeenCalledWith({
                data: newUser,
                include: { Mentee: true }
            })
        })
    })

    describe('update', () => {
        it('should update and return the updated user', async () => {
            // Setup
            const updateData = {
                email: 'updated@example.com'
            }

            const mockUpdatedUser = {
                id: 1,
                email: 'updated@example.com',
                password: 'hashedpassword',
                salt: 'salt',
                Mentee: null
            }

            prismaMock.client.user.update.mockResolvedValue(mockUpdatedUser)

            // Execute
            const result = await repository.update(1, updateData)

            // Verify
            expect(result).toBeInstanceOf(User)
            expect(result.id).toBe(1)
            expect(result.email).toBe('updated@example.com')
            expect(prismaMock.client.user.update).toHaveBeenCalledWith({
                where: { id: 1 },
                data: updateData,
                include: { Mentee: true }
            })
        })
    })

    describe('delete', () => {
        it('should delete a user and return true', async () => {
            // Setup
            prismaMock.client.user.delete.mockResolvedValue({
                id: 1,
                email: 'deleted@example.com',
                password: 'hashedpassword',
                salt: 'salt',
            })

            // Execute
            const result = await repository.delete(1)

            // Verify
            expect(result).toBe(true)
            expect(prismaMock.client.user.delete).toHaveBeenCalledWith({
                where: { id: 1 }
            })
        })
    })

    describe('findAll', () => {
        it('should return all users with pagination', async () => {
            // Setup
            const mockUsers = [
                {
                    id: 1,
                    email: 'user1@example.com',
                    password: 'hashedpassword',
                    salt: 'salt',
                    Mentee: null
                },
                {
                    id: 2,
                    email: 'user2@example.com',
                    password: 'hashedpassword',
                    salt: 'salt',
                    Mentee: null
                }
            ]

            prismaMock.client.user.findMany.mockResolvedValue(mockUsers)

            // Execute
            const result = await repository.findAll({ limit: 10, offset: 0 })

            // Verify
            expect(result.length).toBe(2)
            expect(result[0]).toBeInstanceOf(User)
            expect(result[0].id).toBe(1)
            expect(result[0].email).toBe('user1@example.com')
            expect(result[1].id).toBe(2)
            expect(result[1].email).toBe('user2@example.com')
            expect(prismaMock.client.user.findMany).toHaveBeenCalledWith({
                take: 10,
                skip: 0,
                include: { Mentee: true }
            })
        })
    })

    describe('count', () => {
        it('should return the total count of users', async () => {
            // Setup
            prismaMock.client.user.count.mockResolvedValue(42)

            // Execute
            const result = await repository.count()

            // Verify
            expect(result).toBe(42)
            expect(prismaMock.client.user.count).toHaveBeenCalled()
        })
    })
}) 