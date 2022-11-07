/* eslint-disable import/no-unresolved */
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUserRepository } from "../../repositories/IUserRepository";

@injectable()
export class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUserRepository
    ) {}

    async execute(data: ICreateUserDTO): Promise<void> {
        const userAlreadyExists = await this.usersRepository.findUserByEmail(
            data.email
        );

        if (userAlreadyExists) {
            throw new AppError("User already exists!");
        }

        await this.usersRepository.createUser({
            name: data.name,
            email: data.email,
            password: await hash(data.password, 8),
            driver_license: data.driver_license,
        });
    }
}
