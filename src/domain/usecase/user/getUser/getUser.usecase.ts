import { Inject } from "@nestjs/common";
import { UserRepository } from "src/domain/repository/user.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { GetUserDto } from "./getUser.dto";
import { GetUserResponse } from "./getUser.response";

export class CreateUserUseCase implements BaseUseCase<GetUserDto, GetUserResponse[]>{

    constructor(
        @Inject('UserRepository') private _userRepository: UserRepository,
    ) { }

    async get(dto?: GetUserDto): Promise<GetUserResponse[]> {
        let users = await this._userRepository.getAll()
        let from = dto.page * dto.size
        let to = from + dto.size
        //return empty if the pagination exceeds the length of the array
        if (from >= users.length) return []

        //change to if it exceeds the array length
        if (to >= users.length) to = users.length
        return users.slice(from, to).map(user => {
            return new GetUserResponse(user)
        })
    }
}