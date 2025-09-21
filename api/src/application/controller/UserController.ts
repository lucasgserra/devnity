import { Request, Response } from "express";
import { CreateUser } from "../usecases/CreateUser";
import { PrismaUserRepository } from "../adapters/PrismaUserRepository";
import { User } from "../domain/User";

const userRepo = new PrismaUserRepository();
const createUser = new CreateUser(userRepo);

export async function createUserHandler(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    const userObject = new User(name, email, '', password)
    const user = await createUser.execute(userObject);
    res.status(201).json(user);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
}
