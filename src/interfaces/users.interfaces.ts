import { z } from "zod";
import { deleteUserSchema, updateUserSchema, userSchema, userSchemaRequest, userSchemaResponse } from "../schemas/users.schemas";


export type TMyUser = z.infer<typeof userSchema>
export type TMyUserResponse = z.infer<typeof userSchemaResponse>
export type TMyUserRequest = z.infer<typeof userSchemaRequest>
export type TMyUserUpdateRequest = z.infer<typeof updateUserSchema>
export type TMyUserDeleteRequest = z.infer<typeof deleteUserSchema>