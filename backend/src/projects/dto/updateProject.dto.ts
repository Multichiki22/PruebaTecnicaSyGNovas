import { Transform } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateProjectDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (!!!value) return null
    return new Date(value);
  })
  @IsDate({ message: 'The start date must be in format YYYY-MM-DD' })
  startDate: Date;

  @IsOptional()
  @Transform(({ value }) => {
    if (!!!value) return null
    return new Date(value);
  })
  @IsDate({ message: 'The end date must be in format YYYY-MM-DD' })
  endDate: Date;
}
