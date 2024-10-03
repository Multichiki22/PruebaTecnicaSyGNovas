import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { AtGuard } from 'src/common/guards';
import { EditTaskStateDto } from './dto/editTask.dto';
import { NewTaskDto } from './dto/newTask.dto';
import { RolesGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Rol, User } from '@prisma/client';
import { getCurrentUser } from 'src/common/decorators';

@UseGuards(AtGuard)
@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @UseGuards(RolesGuard)
  @Roles(Rol.ADMIN)
  @Get()
  ReadTask(@Query('project_id', ParseIntPipe) projectId: number) {
    return this.taskService.getTaskByProyect(projectId);
  }

  @Get("/myTasksByProject")
  getMyTaskByProject(@getCurrentUser() user: User, @Query('project_id', ParseIntPipe) projectId: number) {
    return this.taskService.getMyTaskByProject(user, projectId);
  }
  
  @Get("/myTasks")
  getMyTask(@getCurrentUser() user: User) {
    return this.taskService.getMyTasks(user);
  }

  @UseGuards(RolesGuard)
  @Roles(Rol.ADMIN)
  @Post()
  CreateTask(@Body() dto: NewTaskDto) {
    return this.taskService.CreateTask(dto);
  }

  @Patch('/:id')
  updateTaskState(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EditTaskStateDto,
  ) {
    return this.taskService.updateTaskStateById(id, dto);
  }
}
