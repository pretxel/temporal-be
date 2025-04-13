import { type Mentee } from './Mentee';
import * as crypto from 'crypto';

/**
 * User domain entity interface
 * Represents a user in the system
 */
export interface IUser {
  id?: number;
  email: string;
  password: string;
  salt: string;
  mentee?: Mentee | null;
}

/**
 * User domain entity class implementation
 * Provides business logic methods for users
 */
export class User implements IUser {
  id?: number;
  email: string;
  password: string;
  salt: string;
  mentee?: Mentee | null;

  constructor(props: IUser) {
    this.id = props.id;
    this.email = props.email;
    this.password = props.password;
    this.salt = props.salt;
    this.mentee = props.mentee;
  }

  /**
   * Factory method to create a new user with a hashed password
   * @param email User email
   * @param password Plain text password
   * @returns A new User instance with hashed password and salt
   */
  static create(email: string, password: string): User {
    const { hashedPassword, salt } = User.hashPassword(password);

    return new User({
      email,
      password: hashedPassword,
      salt
    });
  }

  /**
   * Verify if a given password matches the user's stored password
   * @param plainTextPassword The password to verify
   * @returns True if the password matches, false otherwise
   */
  verifyPassword(plainTextPassword: string): boolean {
    const hashedPassword = User.hashPasswordWithSalt(plainTextPassword, this.salt);
    return this.password === hashedPassword;
  }

  /**
   * Hash a password with a generated salt
   * @param password The password to hash
   * @returns The hashed password and salt
   */
  private static hashPassword(password: string): { hashedPassword: string; salt: string } {
    const salt = crypto.randomBytes(16).toString('hex');
    const hashedPassword = User.hashPasswordWithSalt(password, salt);

    return { hashedPassword, salt };
  }

  /**
   * Hash a password with a given salt
   * @param password The password to hash
   * @param salt The salt to use
   * @returns The hashed password
   */
  private static hashPasswordWithSalt(password: string, salt: string): string {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  }
}

/**
 * User creation attributes
 * Used when creating a new user without an ID
 */
export type UserCreationAttributes = Omit<IUser, 'id' | 'mentee'>;

/**
 * User update attributes
 * Used when updating a user - all fields are optional
 */
export type UserUpdateAttributes = Partial<UserCreationAttributes>;
