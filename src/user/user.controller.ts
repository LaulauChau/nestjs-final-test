import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AddUserDto } from './dto/add-user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async register(
        @Body(new ValidationPipe({ skipMissingProperties: true }))
        user: AddUserDto,
    ) {
        return this.userService.addUser(user.email);
    }
}
