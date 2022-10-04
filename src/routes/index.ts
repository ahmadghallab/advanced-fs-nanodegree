import express from 'express'
import users from './api/users'

const routes = express.Router()

routes.use('/users', users)

export default routes
