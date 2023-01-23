import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from './../../config/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService,
    ) { }

  create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  // get filtered users store 
  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput
}): Promise<(User) []> {

    const { skip, take, cursor, where, orderBy } = params;
    
    return this.prisma.user.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
    })

}


  async findOne(userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    ): Promise<User | null> {

        const user = await this.prisma.user.findUnique({
          where: userWhereUniqueInput,
        });
        console.log('user',user);
        
        if (user == null) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return user;   

         
  }

  update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    const user = this.findOne(where);
    
    if (user==null){
      throw new NotFoundException("User not found")
    }
   
    return this.prisma.user.update({
      data,
      where,
    });
  }

  remove(where: Prisma.UserWhereUniqueInput): Promise<User> {
    const user =  this.prisma.user.delete({
      where,
    });

    if(user==null){
      throw new NotFoundException("User not found")
    }

    return user;
  }
}
