import { inject } from "tsyringe";

import { deleteFile } from "../../../../utils/file";
import { IUserRepository } from "../../repositories/IUserRepository";

interface IRquest {
    user_id: string;
    avatar_file: string;
}

export class UpdateUserAvatarUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUserRepository,

        @inject("StorageProvider")
        private storageProvider: any
    ) {}

    async execute({ user_id, avatar_file }: IRquest): Promise<void> {
        const user = await this.usersRepository.findUserById(user_id);

        if (user.avatar) {
            await deleteFile(`./tmp/avatar/${user.avatar}`);
            // await this.storageProvider.delete(user.avatar, "avatar");
        }

        // await this.storageProvider.save(avatar_file, "avatar");

        await this.usersRepository.createUser({ ...user, avatar: avatar_file });
    }
}
