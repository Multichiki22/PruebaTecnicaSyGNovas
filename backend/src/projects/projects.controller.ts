import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { NewProjectDto } from './dto/newProject.dto';
import { AtGuard } from 'src/common/guards';
import { UpdateProjectDto } from './dto/updateProject.dto';
import { getCurrentUser } from 'src/common/decorators';
import { Rol, User } from '@prisma/client';
import { RolesGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';


@UseGuards(AtGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}


  @UseGuards(RolesGuard)
  @Roles(Rol.ADMIN)
  @Get()
  getAllProjects() {
    return this.projectsService.getAllProjects();
  }

  
  @Get("myProjects")
  getMyProjects(@getCurrentUser() user: User) {
    return this.projectsService.getMyProjects(user);
  }


  @Get('/:id')
  getProjectById(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.getProjectById(id);
  }

  @UseGuards(RolesGuard)
  @Roles(Rol.ADMIN)
  @Post()
  createProject(@Body() dto: NewProjectDto) {
    return this.projectsService.createProject(dto);
  }

  @UseGuards(RolesGuard)
  @Roles(Rol.ADMIN)
  @Put('/:id')
  updateProject(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProjectDto) {
    return this.projectsService.updateProject(id,dto);
  }

  @UseGuards(RolesGuard)
  @Roles(Rol.ADMIN)
  @Delete('/:id')
  deleteProject(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.deleteProject(id);
  }
}
