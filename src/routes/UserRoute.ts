import { Router } from "express"

import createUser from "../controllers/users/createUser.controller"
import Login from "../controllers/users/login.controller"
import GetData from "../controllers/users/getOne"
const userRouter = Router()



userRouter.post("/", createUser)
userRouter.post("/login", Login)
userRouter.post("/me", GetData)

export default userRouter