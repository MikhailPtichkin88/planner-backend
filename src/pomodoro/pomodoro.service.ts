import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { PomodoroSessionDto } from './dto/pomodoro-session.dto'
import { PomodoroRoundDto } from './dto/pomodoro-round.dto'
import { ErrorHandler } from 'src/decorators/catch-error.decorator'


@Injectable()
export class PomodoroService {
	constructor(private prisma: PrismaService) { }

	@ErrorHandler("session")
	async getTodaySession(userId: string) {
		// один день - одна сессия, поэтому ищем по дате без времени
		const today = new Date().toISOString().split("T")[0]
		return this.prisma.pomodoroSession.findFirst({
			where: { createdAt: { gte: new Date(today) }, userId },
			include: {
				rounds: {
					orderBy: {
						id: "asc"
					}
				}
			}
		})
	}

	@ErrorHandler("session")
	async create(userId: string) {
		const todaySession = await this.getTodaySession(userId)
		if (todaySession) return todaySession

		const user = await this.prisma.user.findUnique({ where: { id: userId }, select: { intervalsCount: true } })
		if (!user) throw new Error("User not found")
		return this.prisma.pomodoroSession.create({
			data: {
				rounds: {
					createMany: {
						data: Array.from({ length: user.intervalsCount }, () => ({ totalSeconds: 0 }))
					}
				},
				user: {
					connect: { id: userId }
				}
			},
			include: {
				rounds: true
			}
		})
	}

	@ErrorHandler("session")
	async updateSession(dto: Partial<PomodoroSessionDto>, pomodoroSessionId: string, userId: string) {
		return this.prisma.pomodoroSession.update({
			where: {
				id: pomodoroSessionId,
				userId
			},
			data: dto
		})
	}

	@ErrorHandler("round")
	async updateRound(dto: Partial<PomodoroRoundDto>, pomodoroRoundId: string) {
		return this.prisma.pomodoroRound.update({
			where: {
				id: pomodoroRoundId,
			},
			data: dto
		})
	}

	@ErrorHandler("round")
	async deleteSession(pomodoroSessionId: string, userId: string) {
		return this.prisma.pomodoroSession.delete({
			where: {
				id: pomodoroSessionId,
				userId
			},
		})
	}
}

