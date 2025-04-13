import { describe, it, expect } from 'vitest';
import { User } from '../../src/core/domain/User';

describe('User Domain Entity', () => {
  describe('create', () => {
    it('should create a user with hashed password and salt', () => {
      // Arrange
      const email = 'test@example.com';
      const password = 'password123';

      // Act
      const user = User.create(email, password);

      // Assert
      expect(user).toBeInstanceOf(User);
      expect(user.email).toBe(email);
      expect(user.password).not.toBe(password); // Password should be hashed
      expect(user.salt).toBeDefined();
      expect(user.password.length).toBeGreaterThan(0);
      expect(user.salt.length).toBeGreaterThan(0);
    })
  });

  describe('verifyPassword', () => {
    it('should return true for correct password', () => {
      // Arrange
      const email = 'test@example.com';
      const password = 'password123';
      const user = User.create(email, password);

      // Act
      const result = user.verifyPassword(password);

      // Assert
      expect(result).toBe(true);
    })

    it('should return false for incorrect password', () => {
      // Arrange
      const email = 'test@example.com';
      const password = 'password123';
      const user = User.create(email, password);

      // Act
      const result = user.verifyPassword('wrongpassword');

      // Assert
      expect(result).toBe(false);
    })
  });

  describe('constructor', () => {
    it('should create a user with given properties', () => {
      // Arrange
      const userData = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedpassword',
        salt: 'salt123'
      };

      // Act
      const user = new User(userData);

      // Assert
      expect(user.id).toBe(userData.id);
      expect(user.email).toBe(userData.email);
      expect(user.password).toBe(userData.password);
      expect(user.salt).toBe(userData.salt);
    })
  });
})
