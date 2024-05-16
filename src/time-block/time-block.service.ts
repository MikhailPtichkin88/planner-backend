import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { TimeBlockDto } from './dto/time-block.dto'
import { ErrorHandler } from 'src/decorators/catch-error.decorator'


@Injectable()
export class TimeBlockService {
	constructor(private prisma: PrismaService) { }

	@ErrorHandler("time blocks")
	async getAll(userId: string) {
		return this.prisma.timeBlock.findMany({
			where: { userId },
			orderBy: { order: 'asc' },
		})
	}

	@ErrorHandler("time block")
	async create(dto: TimeBlockDto, userId: string) {
		return this.prisma.timeBlock.create({
			data: {
				...dto,
				user: {
					connect: { id: userId }
				}
			}
		})
	}

	@ErrorHandler("time block")
	async update(dto: Partial<TimeBlockDto>, timeBlockId: string, userId: string) {
		return await this.prisma.timeBlock.update({
			where: {
				id: timeBlockId,
				userId
			},
			data: dto
		})

	}

	@ErrorHandler("time block")
	async delete(timeBlockId: string, userId: string) {
		return this.prisma.timeBlock.delete({
			where: { id: timeBlockId, userId }
		})

	}

	@ErrorHandler("time blocks order")
	async updateOrder(ids: string[]) {
		return this.prisma.$transaction(
			ids.map((id, order) => {
				return this.prisma.timeBlock.update({
					where: { id },
					data: { order }
				})
			})
		)
	}
}

