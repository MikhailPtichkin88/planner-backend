import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { PrismaService } from 'src/prisma.service'
import { JwtStrategy } from 'src/auth/jwt.strategy'

@Module({
	controllers: [UserController],
	providers: [UserService, PrismaService, JwtStrategy],
	exports: [UserService]
})
export class UserModule { }
