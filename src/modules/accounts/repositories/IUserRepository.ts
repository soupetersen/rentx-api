import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

export interface IUserRepository {
    findUserById(id: string): Promise<User>;
    findUserByEmail(email: string): Promise<User>;
    findUserByRefreshToken(refresh_token: string): Promise<User>;
    createUser(data: ICreateUserDTO): Promise<void>;
    updateUserAvatar(user_id: string, avatar_file: string): Promise<void>;
    save(user: User): Promise<void>;
}
