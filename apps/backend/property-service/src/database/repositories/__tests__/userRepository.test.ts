import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { UserModel, ICreateUser, IUpdateUser } from '@/src/database/models/property.model';
import { UserRepositories } from '@/src/database/repositories/user.repository'; // Adjust the path to your UserRepositories
import { UserQueryParams } from '@/src/controllers/user.controller';

let mongoServer: MongoMemoryServer;
let userRepository: UserRepositories;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
  });

  userRepository = new UserRepositories();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('UserRepositories', () => {
  beforeEach(async () => {
    await UserModel.deleteMany({});
  });

  it('should create a new user', async () => {
    const newUser: ICreateUser = {
      fullName: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      age: 30
    };
    const hashedPassword = 'hashedpassword123';

    const savedUser = await userRepository.createUser(hashedPassword, newUser);

    expect(savedUser).toHaveProperty('_id');
    expect(savedUser.fullName).toBe(newUser.fullName);
    expect(savedUser.email).toBe(newUser.email);
    expect(savedUser.password).toBe(hashedPassword);
    expect(savedUser.age).toBe(newUser.age);
  });

  it('should get all users with query parameters', async () => {
    const user1 = new UserModel({ fullName: 'John Doe', email: 'john@example.com', password: 'password123', age: 30 });
    const user2 = new UserModel({ fullName: 'Jane Doe', email: 'jane@example.com', password: 'password123', age: 25 });
    await user1.save();
    await user2.save();

    const query: UserQueryParams  = { page: 1, limit: 10, age: 'asc' };
    const result = await userRepository.getAllUsers(query);

    expect(result.totalUser).toBe(2);
    expect(result.totalPages).toBe(1);
    expect(result.users).toHaveLength(2);
  });

  it('should get one user by id', async () => {
    const user = new UserModel({ fullName: 'John Doe', email: 'john@example.com', password: 'password123', age: 30 });
    const savedUser = await user.save();

    const foundUser = await userRepository.getOneUsers(savedUser._id.toString());

    expect(foundUser).not.toBeNull();
    expect(foundUser?.fullName).toBe(user.fullName);
    expect(foundUser?.email).toBe(user.email);
    expect(foundUser?.age).toBe(user.age);
  });

  it('should update a user', async () => {
    const user = new UserModel({ fullName: 'John Doe', email: 'john@example.com', password: 'password123', age: 30 });
    const savedUser = await user.save();

    const updateUser: IUpdateUser = { fullName: 'John Doe Updated', email: 'john_updated@example.com', age: 31, status: 'active' };
    const result = await userRepository.updateUser(savedUser._id.toString(), updateUser);

    expect(result.message).toBe('update successfully');
    expect(result.data?.fullName).toBe(updateUser.fullName);
    expect(result.data?.email).toBe(updateUser.email);
    expect(result.data?.age).toBe(updateUser.age);
  });

  it('should delete a user', async () => {
    const user = new UserModel({ fullName: 'John Doe', email: 'john@example.com', password: 'password123', age: 30 });
    const savedUser = await user.save();

    const result = await userRepository.deleteUser(savedUser._id.toString());

    expect(result.message).toBe('delete successfully');
    const foundUser = await userRepository.getOneUsers(savedUser._id.toString());
    expect(foundUser).toBeNull();
  });
});
