import { getRepository, Repository } from "typeorm";

import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";

export class UsersRepository implements IUserRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async findUserByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ where: { email } });
        return user;
    }

    async findUserById(id: string): Promise<User> {
        const user = await this.repository.findOne({ where: { id } });
        return user;
    }

    findUserByRefreshToken(refresh_token: string): Promise<User> {
        throw new AppError("Method not implemented.");
    }

    async createUser(data: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name: data.name,
            email: data.email,
            password: data.password,
            driver_license: data.driver_license,
            id: data.id,
            avatar: data.avatar,
        });

        await this.repository.save(user);
    }

    updateUserAvatar(user_id: string, avatar_file: string): Promise<void> {
        throw new AppError("Method not implemented.");
    }

    save(user: User): Promise<void> {
        throw new AppError("Method not implemented.");
    }
}
