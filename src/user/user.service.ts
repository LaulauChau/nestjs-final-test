import { ConflictException, Injectable } from '@nestjs/common';
import type { User } from '@prisma/client';
import { DatabaseService } from '../infrastructure/database/database.service';

@Injectable()
export class UserService {
    constructor(private readonly databaseService: DatabaseService) {}

    async addUser(email: string): Promise<User> {
        const existingUser = await this.getUser(email);

        if (existingUser) {
            throw new ConflictException();
        }

        return this.databaseService.user.create({ data: { email } });
    }

    async getUser(email: string): Promise<User | null> {
        return this.databaseService.user.findUnique({ where: { email } });
    }

    async resetData(): Promise<void> {
        await new Promise((resolve) =>
            setTimeout(async () => {
                await this.databaseService.user.deleteMany();
                resolve('User data has been reset.');
            }, 1000),
        );

        return;
    }
}
