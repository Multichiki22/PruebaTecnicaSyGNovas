import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NewProjectDto } from './dto/newProject.dto';
import { UpdateProjectDto } from './dto/updateProject.dto';
import { User } from '@prisma/client';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async getAllProjects() {
    return await this.prisma.projects.findMany({
      include: { user: { select: { email: true } } },
    });
  }

  async getMyProjects(user: User) {
    const projects=  await this.prisma.projects.findMany({
      where: {
        task: {
          some: {
          assignedUserId: user.id,
          },
        },
      },
      include: {
        task: true,
        user: { select: { email: true } },
      },
    });
    return projects
  }

  async getProjectById(id: number) {
    return await this.prisma.projects.findFirst({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        dateOfStart: true,
        dateOfEnd: true,
        user: { select: { email: true } },
      },
    });
  }

  async createProject(dto: NewProjectDto) {
    const user = await this.prisma.user.findFirst({
      where: { email: dto.email },
    });
    if (!user) throw new NotFoundException('User not found');
    return await this.prisma.projects.create({
      data: {
        name: dto.name,
        description: dto.description,
        dateOfStart: dto.startDate ? dto.startDate : null,
        dateOfEnd: dto.endDate ? dto.endDate : null,
        user: {
          connect: user,
        },
      },
    });
  }

  async updateProject(id: number, dto: UpdateProjectDto) {
    const previousState = await this.prisma.projects.findFirst({
      where: { id },
      include: { user: true },
    });

    if (!previousState) {
      throw new Error('Project not found');
    }

    const updateData: any = {};

    if (dto.name && dto.name !== previousState.name) {
      updateData.nombre = dto.name;
    }

    if (dto.description && dto.description !== previousState.description) {
      updateData.description = dto.description;
    }

    if (dto.startDate && dto.startDate != previousState.dateOfStart) {
 
      updateData.dateOfStart = dto.startDate;
    }

    if (dto.endDate && dto.endDate != previousState.dateOfEnd) {
      updateData.dateOfEnd = dto.endDate;
    }

    if (dto.email && dto.email !== previousState.user.email) {
      const newAsignedUser = await this.prisma.user.findFirst({
        where: { email: dto.email },
      });
      if (newAsignedUser) {
        updateData.user = { connect: { id: newAsignedUser.id } };
      } else {
        throw new Error('User not found');
      }
    }
    await this.prisma.projects.update({ where: { id }, data: updateData });
  }

  async deleteProject(id: number) {
    await this.prisma.projects.delete({ where: { id } });
  }
}
