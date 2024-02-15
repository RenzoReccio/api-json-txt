import { User } from "../model/interface/user.interface";

export interface UserRepository {
    getAll(): Promise<User[]>;
    create(user: User): Promise<void>;
    getByEmail(email: string): Promise<User>;
}