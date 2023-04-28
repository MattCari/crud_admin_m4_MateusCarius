import { Router } from "express";
import {
  createUser,
  deleteUser,
  listLogedUsers,
  listUsers,
  reactivateUserController,
  updateUser,
} from "../../controllers/usersControlers/users.controllers";
import {
  userSchemaRequest,
  updateUserSchema,
} from "../../schemas/users.schemas";
import ensureBodyIsValid from "../../middlewares/ensureBodyIsValid";
import ensureIsAdmin from "../../middlewares/ensureIsAdmin";
import ensureTokenIsValid from "../../middlewares/ensureTokenIsValid";
import ensureEmailNotExists from "../../middlewares/ensureEmailNotExits";

const userRoutes: Router = Router();

userRoutes.post("", ensureBodyIsValid(userSchemaRequest),ensureEmailNotExists, createUser);
userRoutes.get("", ensureTokenIsValid,ensureIsAdmin, listUsers);
userRoutes.get("/:profile", ensureTokenIsValid, ensureIsAdmin, listLogedUsers);
userRoutes.patch(
  "/:id",
  ensureTokenIsValid,
  ensureBodyIsValid(updateUserSchema),
  ensureIsAdmin,
  updateUser
);
userRoutes.delete("/:id", ensureTokenIsValid, ensureIsAdmin, deleteUser);
userRoutes.put("/:id/recover", ensureTokenIsValid,ensureIsAdmin,reactivateUserController);

export default userRoutes;
