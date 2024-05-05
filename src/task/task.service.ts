import { BadRequestException, Injectable } from '@nestjs/common';
import type { Task } from '@prisma/client';
import { isUUID } from 'class-validator';
import { DatabaseService } from '../infrastructure/database/database.service';

@Injectable()
export class TaskService {
    constructor(private readonly databaseService: DatabaseService) {}

    async addTask(
        name: string,
        userId: string,
        priority: number,
    ): Promise<Task> {
        const existingUser = await this.databaseService.user.findUnique({
            where: { id: userId },
        });

        if (!existingUser) {
            throw new BadRequestException('User not found');
        }

        return this.databaseService.task.create({
            data: {
                name,
                priority,
                userId,
            },
        });
    }

    async getTaskByName(name: string): Promise<Task | null> {
        return this.databaseService.task.findFirst({ where: { name } });
    }

    getUserTasks(userId: string): Promise<Task[]> {
        try {
            if (!isUUID(userId)) {
                throw new BadRequestException();
            }

            return this.databaseService.task.findMany({ where: { userId } });
        } catch (error: unknown) {
            throw new BadRequestException();
        }
    }

    async resetData(): Promise<void> {
        await this.databaseService.task.deleteMany();
    }
}
