import { State } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
} from 'class-validator';

export class EditTaskStateDto {
  @IsNotEmpty()
  @IsEnum(State)
  state: State;
}
