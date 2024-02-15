import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ApiTags, ApiResponse } from "@nestjs/swagger";
import { CreateUserDto } from "src/domain/usecase/user/createUser/createUser.dto";
import { CreateUserUseCase } from "src/domain/usecase/user/createUser/createUser.usecase";
import { GetUserDto } from "src/domain/usecase/user/getUser/getUser.dto";
import { GetUserResponse } from "src/domain/usecase/user/getUser/getUser.response";
import { GetUserUseCase } from "src/domain/usecase/user/getUser/getUser.usecase";

@Controller('user')
@ApiTags('user')
export class UserController {

  constructor(
    private getUserUseCase: GetUserUseCase,
    private createUserUseCase: CreateUserUseCase,
  ) { }

  @Get('')
  @ApiResponse({ type: GetUserResponse, isArray: true, status: 200 })
  async getUser(@Query() getUserDto: GetUserDto) {
    let users = await this.getUserUseCase.get(getUserDto);
    return users;
  }

  @Post('')
  @ApiResponse({ type: String, isArray: false, status: 200 })
  async createUser(@Body() createUserDto: CreateUserDto) {
    let users = await this.createUserUseCase.get(createUserDto);
    return users;
  }
}