import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { TaskDto } from './dto/task.dto'
import { ErrorHandler } from 'src/decorators/catch-error.decorator'


@Injectable()
export class TaskService {
	constructor(private prisma: PrismaService) { }

	@ErrorHandler("tasks")
	getAll(userId: string) {
		return this.prisma.task.findMany({
			where: { userId },
		})
	}

	@ErrorHandler("task")
	async create(dto: TaskDto, userId: string) {
		return this.prisma.task.create({
			data: {
				...dto,
				user: {
					connect: { id: userId }
				}
			}
		})
	}


	@ErrorHandler("task")
	async update(dto: Partial<TaskDto>, taskId: string, userId: string) {
		return this.prisma.task.update({
			where: {
				userId,
				id: taskId
			},
			data: dto
		})
	}

	@ErrorHandler("task")
	async delete(taskId: string) {
		return this.prisma.task.delete({
			where: {
				id: taskId
			}
		})
	}
}
