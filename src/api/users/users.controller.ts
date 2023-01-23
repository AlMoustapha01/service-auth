import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  @ApiConsumes('application/x-www-form-urlencoded')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({ type: UserEntity,isArray:true })
  @ApiConsumes('application/x-www-form-urlencoded')
  findAll() {
    return this.usersService.findAll({});
  }

  @ApiOkResponse({ type: UserEntity })
  @ApiConsumes('application/x-www-form-urlencoded')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({id:id})
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: UserEntity })
  @ApiConsumes('application/x-www-form-urlencoded')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
   return this.usersService.update({
    where:{id:id},
    data:updateUserDto
   })
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserEntity })
  @ApiConsumes('application/x-www-form-urlencoded')
  remove(@Param('id') id: string) {
    return this.usersService.remove({id:id});
  }
}
