import 'reflect-metadata';
import { container } from 'tsyringe';
import { UserRepository } from '../repository/UserRepository';

// Register repositories
container.register('IUserRepository', {
  useClass: UserRepository
});

export { container };
