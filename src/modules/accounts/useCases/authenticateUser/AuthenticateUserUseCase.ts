/* eslint-disable import/no-unresolved */
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IUserRepository } from "../../repositories/IUserRepository";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
    refresh_token: string;
}

@injectable()
export class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUserRepository
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findUserByEmail(email);

        if (!user) {
            throw new AppError("Email or password incorrect!");
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("Email or password incorrect!");
        }

        const token = sign({}, "d0f9a0d0f9a0d0f9a0d0f9a0d0f9a0d0", {
            subject: user.id,
            expiresIn: "1d",
        });

        const refresh_token = sign(
            { email },
            "d0f9a0d0f9a0d0f9a0d0f9a0d0f9a0d0",
            {
                subject: user.id,
                expiresIn: "30d",
            }
        );

        const tokenReturn: IResponse = {
            user: {
                name: user.name,
                email: user.email,
            },
            token,
            refresh_token,
        };

        return tokenReturn;
    }
}
