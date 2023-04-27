import { Request, Response } from "express";
import {
  TMyUserRequest,
  TMyUserResponse,
  TMyUserUpdateRequest,
} from "../../interfaces/users.interfaces";
import createUserService from "../../services/user/createUser.service";
import listUsersService from "../../services/user/listUser.service";
import updateUserService from "../../services/user/updateUser.service";
import listLogedUserService from "../../services/user/listAllLogedUsers";
import { inactivateUser } from "../../services/user/softDeleteUser";
import { reactivateUser } from "../../services/user/reactivateUser.service";

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data: TMyUserRequest = req.body;

  const newUser: TMyUserResponse = await createUserService(data);

  return res.status(201).json(newUser);
};

export const listUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users: TMyUserResponse[] = await listUsersService();

  return res.status(200).json(users);
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data: TMyUserUpdateRequest = req.body;
  const { id } = req.params;

  const user: TMyUserResponse = await updateUserService(data, Number(id));

  return res.status(200).json(user);
};

export const listLogedUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users: TMyUserResponse[] = await listLogedUserService()

  return res.status(200).json(users);
};

export const deleteUser = (req: Request, res: Response): Response => {
  inactivateUser(~~req.params.id);
  return res.status(204).json();
};

export const reactivateUserController =  (req: Request, res: Response): Response => {
    const reactivatedUser = reactivateUser(~~req.params.id);
    return res.status(200).json(reactivatedUser);
  };