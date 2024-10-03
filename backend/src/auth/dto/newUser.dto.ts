import {  IsNotEmpty, IsString } from 'class-validator'

export class NewUserDto {
  @IsNotEmpty()
  @IsString()
  user: string;
  
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  email: string;
  
}
