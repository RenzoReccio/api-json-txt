import { Module } from "@nestjs/common";
import { UserService } from "./service/user.service";

@Module({
    imports: [
    ],
    exports: [
        UserService
    ],
    providers: [
        UserService
    ]
})
export class FileModule { }
