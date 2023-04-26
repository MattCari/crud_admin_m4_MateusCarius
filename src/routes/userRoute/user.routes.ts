import { Router } from "express";
import {
  createUser,
  listLogedUsers,
  listUsers,
  updateUser,
} from "../../controllers/usersControlers/users.controllers";
import {
  userSchemaRequest,
  updateUserSchema,
} from "../../schemas/users.schemas";
import ensureBodyIsValid from "../../middlewares/ensureBodyIsValid";
import ensureIsAdmin from "../../middlewares/ensureIsAdmin";
import ensureTokenIsValid from "../../middlewares/ensureTokenIsValid";

const userRoutes: Router = Router();

userRoutes.post("", ensureBodyIsValid(userSchemaRequest), createUser);
userRoutes.get("",ensureTokenIsValid,ensureIsAdmin, listUsers);
userRoutes.get("/:profile", ensureTokenIsValid, ensureIsAdmin, listLogedUsers);
userRoutes.patch(
  "/:id",
  ensureTokenIsValid,
  ensureBodyIsValid(updateUserSchema),
  updateUser
);

export default userRoutes;
