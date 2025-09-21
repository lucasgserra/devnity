import { UserRepository } from "../ports/UserRepository";
import { User } from "../domain/User";
import {prisma} from "../prisma"
import dotenv from "dotenv";
import bcrypt from "bcrypt"

dotenv.config()
const SALT_ROUNDS = process.env.SALT_ROUNDS as unknown as number

async function hashPassword(password: string) {
    return await bcrypt.hash(password, SALT_ROUNDS)
}

export class PrismaUserRepository implements UserRepository {
    async save(user: User): Promise<void> {
        const hpass = await hashPassword(user.password)
        await prisma.user.create({data: {
            name: user.name,
            email: user.email,
            bio: user.bio,
            password: hpass
        }})
    }
    async findByEmail(email: string): Promise<User | null> {
        const data = await prisma.user.findFirst({where: {email:email}})
        return data ? data : null
    }
    async comparePassword(hash: string, password: string): Promise<boolean> {
        return await bcrypt.compare(hash, password)
    }
}