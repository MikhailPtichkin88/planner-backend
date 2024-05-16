
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { PomodoroService } from './pomodoro.service';
import { CurrentUser } from 'src/decorators/user.decorator';
import { Auth } from 'src/decorators/auth.decorator';
import { PomodoroRoundDto } from './dto/pomodoro-round.dto';
import { PomodoroSessionDto } from './dto/pomodoro-session.dto';

@Controller('user/timer')
export class PomodoroController {
	constructor(private readonly pomodoroService: PomodoroService) { }
	@Get("today")
	@Auth()
	async getTodaySession(@CurrentUser("id") userId: string) {
		return this.pomodoroService.getTodaySession(userId)
	}

	@HttpCode(200)
	@Post()
	@Auth()
	async create(@CurrentUser("id") userId: string) {
		return this.pomodoroService.create(userId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put('/round/:id')
	@Auth()
	async updateRound(@Param('id') pomodoroRoundId: string, @Body() dto: Partial<PomodoroRoundDto>,) {
		return this.pomodoroService.updateRound(dto, pomodoroRoundId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth()
	async updateSession(@Param('id') pomodoroSessionId: string, @Body() dto: Partial<PomodoroSessionDto>, @CurrentUser('id') userId: string) {
		return this.pomodoroService.updateSession(dto, pomodoroSessionId, userId)
	}


	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async delete(@Param('id') pomodoroSessionId: string, @CurrentUser('id') userId: string) {
		return this.pomodoroService.deleteSession(pomodoroSessionId, userId)
	}
}
