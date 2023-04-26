import { Request, Response } from "express"
import { TUserLogin } from "../../__tests__/mocks/interfaces"
import { Login } from "../../services/session/createSession.service"


export const createSession = async (req: Request, resp: Response): Promise<Response> => {
    const payload: TUserLogin = req.body

    const token = await Login(payload)

    return resp.status(201).json({token})
}