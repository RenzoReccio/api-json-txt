import { Module } from "@nestjs/common";
import { DataModule } from "src/data/data.module";
import { CreateUserUseCase } from "./usecase/user/createUser/createUser.usecase";
import { GetUserUseCase } from "./usecase/user/getUser/getUser.usecase";
import { UserService } from "src/data/file/service/user.service";

@Module({
    imports: [
        DataModule
    ],
    exports: [
        CreateUserUseCase,
        GetUserUseCase
    ],
    providers: [
        { provide: 'UserRepository', useClass: UserService },
        CreateUserUseCase,
        GetUserUseCase
    ]
})
export class DomainModule { }