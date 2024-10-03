import { Transform } from 'class-transformer';
import {  IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class NewTaskDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  email: string; //assigned

  @IsNotEmpty()
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsNumber()
  @IsInt()
  projectId: number;
}