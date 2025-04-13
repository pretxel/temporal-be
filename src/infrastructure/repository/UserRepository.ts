import { injectable, inject } from 'tsyringe';
import { User, UserCreationAttributes, UserUpdateAttributes } from '../../core/domain/User';
import { Mentee } from '../../core/domain/Mentee';
import { IUserRepository } from '../../core/domain/repository/UserRepository';
import { Prisma } from '../../utils/prisma';

@injectable()
export class UserRepository implements IUserRepository {
    constructor(@inject(Prisma) private readonly prisma: Prisma) { }

    async findById(id: number): Promise<User | null> {
        const userData = await this.prisma.client.user.findUnique({
            where: { id },
            include: { Mentee: true }
        });

        return userData ? this.mapToDomainEntity(userData) : null;
    }

    async findByEmail(email: string): Promise<User | null> {
        const userData = await this.prisma.client.user.findUnique({
            where: { email },
            include: { Mentee: true }
        });

        return userData ? this.mapToDomainEntity(userData) : null;
    }

    async create(data: UserCreationAttributes): Promise<User> {
        const userData = await this.prisma.client.user.create({
            data,
            include: { Mentee: true }
        });

        return this.mapToDomainEntity(userData);
    }

    async update(id: number, data: UserUpdateAttributes): Promise<User> {
        const userData = await this.prisma.client.user.update({
            where: { id },
            data,
            include: { Mentee: true }
        });

        return this.mapToDomainEntity(userData);
    }

    async delete(id: number): Promise<boolean> {
        await this.prisma.client.user.delete({
            where: { id }
        });

        return true;
    }

    async findAll(params?: {
        limit?: number;
        offset?: number;
    }): Promise<User[]> {
        const { limit, offset } = params || {};

        const usersData = await this.prisma.client.user.findMany({
            take: limit,
            skip: offset,
            include: { Mentee: true }
        });

        return usersData.map(userData => this.mapToDomainEntity(userData));
    }

    async count(): Promise<number> {
        return this.prisma.client.user.count();
    }

    /**
     * Map Prisma data to domain entity
     */
    private mapToDomainEntity(userData: any): User {
        const mentee = userData.Mentee
            ? new Mentee({
                id: userData.Mentee.id,
                name: userData.Mentee.name,
                lastName: userData.Mentee.lastName,
                title: userData.Mentee.title,
                mobile: userData.Mentee.mobile,
                userId: userData.Mentee.userId
            })
            : null;

        return new User({
            id: userData.id,
            email: userData.email,
            password: userData.password,
            salt: userData.salt,
            mentee
        });
    }
} 