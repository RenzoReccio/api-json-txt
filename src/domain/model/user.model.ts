import { User } from "./interface/user.interface";

export class UserModel implements User {
    name: string
    email: string
    address: string
    constructor(name: string, email: string, address: string) {
        this.name = name
        this.email = email
        this.address = address
    }
}