import { IsNotEmpty, IsString, IsUUID, Matches } from 'class-validator';

export class AddTaskDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @Matches(/^[1-9]\d*$/)
    priority: number;

    @IsUUID()
    userId: string;
}
