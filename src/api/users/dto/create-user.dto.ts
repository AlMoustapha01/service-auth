
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Matches, MinLength } from 'class-validator';
export class CreateUserDto {

    @IsString()
    @ApiProperty({ required: false, example: 'John', description: 'the first name of User'})
    firstName: string;

    @IsString()
    @ApiProperty({ required: false, example: 'DOE', description: 'the last name of User' })
    lastName: string;

    @IsString()
    @IsEmail()
    @ApiProperty({ example: 'johndoe@example.com', description: 'the email of User' })
    email: string;

    @IsString()
    @ApiProperty({ example: 'john_doe', description: 'the username of User' })
    username: string;
    
    @IsString()
    @MinLength(6)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weaks'})
    @ApiProperty({ description: 'the password of User. He must ha' })
    password: string;
}