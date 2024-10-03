import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './tasks/task.module';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';
import { SeedingModule } from './seeding/seeding.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    TaskModule,
    AuthModule,
    ProjectsModule,
    UsersModule,
    SeedingModule,
  ],
})
export class AppModule {}
