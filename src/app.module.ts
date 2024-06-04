import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { TaskModule } from './task/task.module'
import { TimeBlockModule } from './time-block/time-block.module'
import { PomodoroModule } from './pomodoro/pomodoro.module'
import { AppService } from './app.service'
import { AppController } from './app.controller'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		AuthModule,
		UserModule,
		TaskModule,
		TimeBlockModule,
		PomodoroModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule { }
