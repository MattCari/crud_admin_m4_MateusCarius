import 'express-async-errors'
import express, { Application, json } from 'express'
import userRoutes from './routes/userRoute/user.routes'
import sessionRoute from './routes/sessionRoute/session.route'
import { handleErrors } from './errors'


const app: Application = express()
app.use(json())

app.use('/users', userRoutes)
app.use('/login', sessionRoute)
app.use(handleErrors)
export default app
