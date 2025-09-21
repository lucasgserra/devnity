import { User } from "../domain/User";

export interface UserRepository {
    save(user: User): Promise<void>
    findByEmail(email: string): Promise<User | null>
    comparePassword(hash: string, password: string): Promise<boolean>
}