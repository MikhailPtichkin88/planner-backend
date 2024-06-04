
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { Auth } from 'src/decorators/auth.decorator';
import { CurrentUser } from 'src/decorators/user.decorator';
import { TaskDto } from './dto/task.dto';

@Controller('user/tasks')
export class TaskController {
	constructor(private readonly taskService: TaskService) { }

	@Get()
	@Auth()
	async getAll(@CurrentUser('id') userId: string) {
		return this.taskService.getAll(userId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	@Auth()
	async create(@Body() dto: TaskDto, @CurrentUser('id') userId: string) {
		return this.taskService.create(dto, userId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(":id")
	@Auth()
	async update(@Body() dto: Partial<TaskDto>, @Param("id") taskId: string, @CurrentUser("id") userId: string) {
		return this.taskService.update(dto, taskId, userId)
	}

	@HttpCode(200)
	@Delete(":id")
	@Auth()
	async delete(@Param("id") taskId: string,) {
		return this.taskService.delete(taskId)
	}
}
