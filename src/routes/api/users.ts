import express, { Request, Response } from 'express'
import { UserModel } from '../../models/users';
import { body, validationResult } from 'express-validator'
import RequestValidationError from '../../errors/request-validation-error'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()

const validationRoles = [
  body('first_name')
    .isString()
    .withMessage('First name is required.'),
  body('last_name')
    .isString()
    .withMessage('Last name is required.'),
  body('password').trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 20 characters')
]

const user = new UserModel();

const users = express.Router()

users.get('/', async (req: Request, res: Response) => {
  const result = await user.index();
  return res.status(200).json(result)
})

users.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id  
  const result = await user.show(id);
  return res.status(200).json(result)
})

users.post('/', validationRoles, async (req: Request, res: Response) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array())
  }

  const result = await user.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password
  });

  const userJwt = jwt.sign({
    id: result.id
  }, 'abc123');

  req.session = {
    jwt: userJwt
  }

  return res.status(201).json(result)
})


export default users