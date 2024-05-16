import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { TaskService } from './Task.service'
import { TaskController } from './task.controller'

@Module({
	controllers: [TaskController],
	providers: [TaskService, PrismaService],
	exports: [TaskService]
})
export class TaskModule { }
