import { Specification } from "../entities/Specification";

export interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

export interface ISpecificationsRepository {
    findByName(name: string): Promise<Specification>;
    create({ name, description }: ICreateSpecificationDTO): Promise<void>;
}
