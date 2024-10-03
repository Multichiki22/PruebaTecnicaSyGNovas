import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditTaskStateDto } from './dto/editTask.dto';
import { NewTaskDto } from './dto/newTask.dto';
import { User } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async getTaskByProyect(projectId: number) {
    //Obtener las tasks de un proyecto
    return await this.prisma.task.findMany({
      where: { projectsId: projectId },
    });
  }

  
  async getMyTaskByProject(user: User,projectId: number) {
    //Obtener tus tasks de un proyecto
    return await this.prisma.task.findMany({
      where: { projectsId: projectId, assignedUserId: user.id },
    });
  }

  async getMyTasks(user: User) {
    //Obtener todas tus tasks
    return await this.prisma.task.findMany({
      where: { assignedUserId: user.id },
    });
  }

  async CreateTask(dto: NewTaskDto) {
    //crear una nueva task con la info del body
    const user = await this.prisma.user.findFirst({
      where: { email: dto.email },
    });
    if (!user) throw new NotFoundException('User not found');
    return await this.prisma.task.create({
      data: {
        name: dto.name,
        description: dto.description,
        assignedTo: {connect: user},
        projects: {connect: {id: dto.projectId}}
      },
    });
  }

  async updateTaskStateById(id: number, dto: EditTaskStateDto) {
    //actualizar el estado de la task con la info del body
    //Si es complete actualizar la fecha de finalizacion
    return await this.prisma.task.update({where:{id},data:{
      state: dto.state
    } })
  }
}
