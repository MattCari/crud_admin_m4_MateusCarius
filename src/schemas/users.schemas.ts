import {z} from "zod" 

const userSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(4),
    admin: z.boolean().optional(),
    active: z.boolean()
})

const userSchemaRequest = userSchema.omit({
    id: true,
    active:true
})

const userSchemaResponse = userSchema.omit({
    password: true
})

const allUsersSchemaRequest = z.array(userSchemaResponse)

const updateUserSchema = userSchemaRequest.omit({
    password:true,
    admin:true,
    active:true
}).partial()

export {userSchema,userSchemaRequest,userSchemaResponse,allUsersSchemaRequest,updateUserSchema}