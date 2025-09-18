import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // Protege todas as rotas com JWT
  @UseGuards(JwtAuthGuard)
  @Get()
  async getTasks(@Request() req) {
    return this.tasksService.findAll(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTask(@Request() req, @Body() body: { title: string; description?: string }) {
    return this.tasksService.create(req.user.userId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateTask(
    @Request() req,
    @Param('id') id: number,
    @Body() body: { title?: string; description?: string; status?: string },
  ) {
    return this.tasksService.update(id, req.user.userId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteTask(@Request() req, @Param('id') id: number) {
    return this.tasksService.remove(id, req.user.userId);
  }
}