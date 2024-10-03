import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { State } from '@prisma/client';

@Injectable()
export class SeedingService {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    console.log('Checking for initial data...');

  const usersExist = await this.prisma.user.count();
  if (usersExist === 0) {
    await this.createUsers();
    await this.createProjects();
    await this.createTasks();
  } else {
    console.log('Sample data already exists, skipping creation.');
  }
  }

  private async createUsers() {
    const passwordHashes = await Promise.all(
      Array(5)
        .fill(null)
        .map((_, index) => bcrypt.hash(`user${index + 1}`, 10)),
    );

    const users = await this.prisma.user.createMany({
      data: Array(5)
        .fill(null)
        .map((_, index) => ({
          name: `User ${index + 1}`,
          email: `user${index + 1}@example.com`,
          hash: passwordHashes[index],
          rol: index === 0 ? 'ADMIN' : 'USUARIO',
        })),
      skipDuplicates: true,
    });

    console.log(`Created ${users.count} users`);
  }

  private async createProjects() {
    const projects = await this.prisma.projects.createMany({
      data: Array(3)
        .fill(null)
        .map((_, index) => ({
          name: `Project ${index + 1}`,
          description: `Description of Project ${index + 1}`,
          dateOfStart: new Date(),
          dateOfEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
          userId: (index % 2) + 1,
        })),
      skipDuplicates: true,
    });

    console.log(`Created ${projects.count} projects`);
  }

  private async createTasks() {
    const userProjectsMap = {
      1: [1, 2, 1, 3],
      2: [2, 3, 2, 2],
      3: [1, 1, 1, 1],
      4: [1, 2, 3, 1],
      5: [3, 2, 1, 2],
    };

    for (let userId = 1; userId <= 5; userId++) {
      const projectsForUser = userProjectsMap[userId];
      const tasks = await this.prisma.task.createMany({
        data: Array(4)
          .fill(null)
          .map((_, index) => ({
            name: `Task ${index + 1} for User ${userId}`,
            description: `Description of Task ${index + 1} for User ${userId}`,
            projectsId: projectsForUser[index % projectsForUser.length],
            assignedUserId: userId,
            state: [State.COMPLETADA, State.EN_PROGRESO, State.PENDIENTE][
              Math.floor(Math.random() * 3)
            ],
          })),
        skipDuplicates: true,
      });

      console.log(`Created ${tasks.count} tasks for User ${userId}`);
    }
  }
}
