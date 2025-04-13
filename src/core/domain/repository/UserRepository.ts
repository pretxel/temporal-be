import { User, UserCreationAttributes, UserUpdateAttributes } from '../User';

/**
 * Repository interface for User domain entity
 */
export interface IUserRepository {
    /**
     * Find a user by ID
     * @param id User ID
     * @returns User entity or null if not found
     */
    findById(id: number): Promise<User | null>;

    /**
     * Find a user by email
     * @param email User email
     * @returns User entity or null if not found
     */
    findByEmail(email: string): Promise<User | null>;

    /**
     * Create a new user
     * @param data User creation data
     * @returns Created user entity
     */
    create(data: UserCreationAttributes): Promise<User>;

    /**
     * Update an existing user
     * @param id User ID
     * @param data User update data
     * @returns Updated user entity
     */
    update(id: number, data: UserUpdateAttributes): Promise<User>;

    /**
     * Delete a user by ID
     * @param id User ID
     * @returns True if deleted, false otherwise
     */
    delete(id: number): Promise<boolean>;

    /**
     * Find all users with optional pagination
     * @param params Optional pagination and filtering params
     * @returns Array of user entities
     */
    findAll(params?: {
        limit?: number;
        offset?: number;
    }): Promise<User[]>;

    /**
     * Count users with optional filtering
     * @param params Optional filtering params
     * @returns Number of users matching the criteria
     */
    count(params?: {}): Promise<number>;
} 