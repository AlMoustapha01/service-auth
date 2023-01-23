import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../config/prisma/prisma.service';
import { UsersService } from './users.service';
import { prismaMock } from '../../config/testing/singleton'
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService,PrismaService,ConfigService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create new user ', async () => {
    const user:User = {
      id: "261b5722-98cc-11ed-a8fc-0242ac120002",
      firstName: 'Rich',
      lastName: 'Mond',
      email: 'hello@prisma.io',
      username:'richmond',
      password: 'al@Test20237',
      createdAt: new Date('02-02-2022'),
      updatedAt: new Date('02-02-2022'),
      role: ["ADMIN"]
    }
  
    prismaMock.user.create.mockResolvedValue(user)
  
    await expect(service.create(user)).resolves.toEqual({
      id: "261b5722-98cc-11ed-a8fc-0242ac120002",
      firstName: 'Rich',
      lastName: 'Mond',
      email: 'hello@prisma.io',
      username:'richmond',
      password: 'al@Test20237',
      createdAt: new Date('02-02-2022'),
      updatedAt: new Date('02-02-2022'),
      role: ["ADMIN"]
    })
  });

  it('should update user',async ()=> {
    const user:User = {
      id: "261b5722-98cc-11ed-a8fc-0242ac120002",
      firstName: 'RichMond',
      lastName: 'Koffi',
      email: 'koffi@prisma.io',
      username:'richmond',
      password: 'al@Test20237',
      createdAt: new Date("2023-01-22T12:55:44.107Z"),
      updatedAt: new Date("2023-01-22T12:55:44.107Z"),
      role: ["ADMIN"]
    }
  
    prismaMock.user.create.mockResolvedValue(user)
  
    await expect(service.update({
      where: {id:"261b5722-98cc-11ed-a8fc-0242ac120002"},
      data:user
    })).resolves.toEqual({
      id: "261b5722-98cc-11ed-a8fc-0242ac120002",
      firstName: 'RichMond',
      lastName: 'Koffi',
      email: 'koffi@prisma.io',
      username:'richmond',
      password: 'al@Test20237',
      createdAt: new Date("2023-01-22T12:55:44.107Z"),
      updatedAt: new Date("2023-01-22T12:55:44.107Z"),
      role: ["ADMIN"]
    })
  })
  
});
