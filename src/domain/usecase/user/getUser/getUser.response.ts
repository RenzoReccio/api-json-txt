import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/domain/model/interface/user.interface";

export class GetUserResponse {
    @ApiProperty()
    email: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    name: string;

    constructor(user: User) {
        this.email = user.email
        this.address = user.address
        this.name = user.name
    }
}