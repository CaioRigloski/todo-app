import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn().mockResolvedValue({
                id: 1,
                email: 'test@example.com',
                password: 'hashedPassword',
                name: 'Test User',
              }),
              findUnique: jest.fn().mockImplementation(({ where }) => {
                if (where.email) {
                  return Promise.resolve({
                    id: 1,
                    email: where.email,
                    password: 'hashedPassword',
                    name: 'Test User',
                  });
                }
                if (where.id) {
                  return Promise.resolve({
                    id: where.id,
                    email: 'test@example.com',
                    password: 'hashedPassword',
                    name: 'Test User',
                  });
                }
                return null;
              }),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should create a user', async () => {
    const data = { email: 'test@example.com', password: 'hashedPassword', name: 'Test User' };
    const result = await service.create(data);

    expect(result).toEqual({
      id: 1,
      email: 'test@example.com',
      password: 'hashedPassword',
      name: 'Test User',
    });

    expect(prisma.user.create).toHaveBeenCalledWith({ data });
  });
});