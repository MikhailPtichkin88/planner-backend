
import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';


export function ErrorHandler(entityName: string) {
  return function (_, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2025') {
            throw new NotFoundException(`${entityName} not found`);
          }
        }
        throw new HttpException(`Failed to ${key} ${entityName}`, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    };

    return descriptor;
  };
}
