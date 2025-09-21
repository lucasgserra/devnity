import { User } from "../domain/User";
import { UserRepository } from "../ports/UserRepository";

export class CreateUser {
    constructor(private readonly userRepo: UserRepository) {}

    async execute(u: User): Promise<User>{
        const userExists = await this.userRepo.findByEmail(u.email)
        if (userExists) throw new Error("user already exists");

        const user = new User(u.name, u.email, u.bio, u.password);
        await this.userRepo.save(user)

        return user
    }
}