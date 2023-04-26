import { Router } from "express";
import { createSession } from "../../controllers/sessionControlers/session.controllers";

const sessionRoute:Router = Router()

sessionRoute.post('', createSession)

export default sessionRoute