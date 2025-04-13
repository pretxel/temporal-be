import { inject, injectable } from 'tsyringe';
import { type LoginInput, type LoginResponse } from '../domain/schema/AuthSchema';
import { type User } from '../domain/User';
import { IUserRepository } from '@core/domain/repository/UserRepository';
import { UserRepository } from '@infrastructure/repository/UserRepository';

@injectable()
export class AuthService {
  constructor(@inject(UserRepository) private readonly userRepository: IUserRepository) {}

  async login({ email, password }: LoginInput): Promise<LoginResponse | null> {
    // Find user by email
    const user = await this.userRepository.findByEmail(email);

    // If no user found or password doesn't match, return null
    if (!user || !user.verifyPassword(password)) {
      return null;
    }

    // Generate token payload
    const tokenPayload = this.generateTokenPayload(user);

    // Return response
    return {
      accessToken: tokenPayload, // This will be signed by the JWT plugin
      user: {
        id: user.id ?? 0,
        email: user.email
      }
    };
  }

  private generateTokenPayload(user: User): string {
    // This is just the payload, the actual signing happens in the route handler
    return JSON.stringify({
      id: user.id,
      email: user.email,
      // Add other necessary info for the token but keep it minimal
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 // 1 hour expiration
    });
  }
}
