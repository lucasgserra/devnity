import { Router } from "express"
import { createUserHandler } from "./application/controller/UserController";

const router = Router()

//users
router.post('/users', async (req, res)=>{
    await createUserHandler(req, res)
})

export default router;