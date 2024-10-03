import { Controller, Get, UseGuards } from '@nestjs/common';
import { AtGuard } from 'src/common/guards';
import { UsersService } from './users.service';
import { RolesGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Rol } from '@prisma/client';

@UseGuards(AtGuard)
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Roles(Rol.ADMIN)
  @UseGuards(RolesGuard)
  @Get()
  async getUsersEmailsAndNames() {
    return this.userService.getUsersEmailsAndNames();
  }
}
