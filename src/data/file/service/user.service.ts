import { User } from "src/domain/model/interface/user.interface";
import { UserRepository } from "src/domain/repository/user.repository";
import { createFile, getFile } from "../helper/file.helper";
import { join } from "path";

export class UserService implements UserRepository {

    private path = 'data.txt'

    async getAll(): Promise<User[]> {
        let fullPath = join(process.cwd(), this.path)
        let data = await getFile(fullPath)
        if (data == "") return []
        return JSON.parse(data.toString()) as User[]
    }
    async create(user: User): Promise<void> {
        let fullPath = join(process.cwd(), this.path)
        let data = await getFile(fullPath)
        let users
        if (data == "") users = []
        else users = JSON.parse(data.toString()) as User[]
        users.push(user);
        createFile(process.cwd(), this.path, JSON.stringify(users));
    }
    async getByEmail(email: string): Promise<User> {
        let fullPath = join(process.cwd(), this.path)
        let data = await getFile(fullPath)
        if (data == "") return null
        let users = JSON.parse(data.toString()) as User[]
        return users.find(user => user.email === email)
    }

}