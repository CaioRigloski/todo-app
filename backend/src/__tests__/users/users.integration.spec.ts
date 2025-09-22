import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersService } from 'src/users/users.service';


describe('UsersService Integration', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);

    // clear users before tests
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    // clear users after tests
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  it('should create a user and retrieve it by email', async () => {
    const userData = {
      email: 'test@example.com',
      password: '123456',
      name: 'Test User',
    };

    // create user
    const user = await service.create(userData);

    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.email).toBe(userData.email);

    // find by email
    const found = await service.findByEmail(userData.email);
    expect(found).toBeDefined();
    expect(found?.email).toBe(userData.email);
  });
});