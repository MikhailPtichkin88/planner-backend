
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { TimeBlockService } from './time-block.service';
import { CurrentUser } from 'src/decorators/user.decorator';
import { Auth } from 'src/decorators/auth.decorator';
import { TimeBlockDto } from './dto/time-block.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('user/time-blocks')
export class TimeBlockController {
	constructor(private readonly timeBlockService: TimeBlockService) { }

	@Get()
	@Auth()
	async getAll(@CurrentUser("id") userId: string) {
		return this.timeBlockService.getAll(userId)
	}


	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	@Auth()
	async create(@Body() dto: TimeBlockDto, @CurrentUser("id") userId: string) {
		return this.timeBlockService.create(dto, userId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put("update-order")
	@Auth()
	updateOrder(@Body() dto: UpdateOrderDto) {
		return this.timeBlockService.updateOrder(dto.ids)
	}

	@HttpCode(200)
	@Put(":id")
	@Auth()
	async update(@Param("id") timeBlockId: string, @Body() dto: TimeBlockDto, @CurrentUser("id") userId: string) {
		return this.timeBlockService.update(dto, timeBlockId, userId)
	}

	@HttpCode(200)
	@Delete(":id")
	@Auth()
	async delete(@Param("id") timeBlockId: string, @CurrentUser("id") userId: string) {
		return this.timeBlockService.delete(timeBlockId, userId)
	}

}
