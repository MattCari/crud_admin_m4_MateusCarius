import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const ensureIsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
    const isAdmin = res.locals.token.admin
    console.log(res.locals)
    if(isAdmin === true){
        return next()
    }else{
        throw new AppError("Insufficient Permission", 403)
    }
};

export default ensureIsAdmin