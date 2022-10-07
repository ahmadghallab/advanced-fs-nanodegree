import express, { Request, Response } from 'express'
import { UserModel } from '../../models/users';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { Password } from '../../services/password';
import { BadRequestError } from '../../errors/bad-request-error';
import { validateRequest } from '../../middlewares/validate-request';
import { signInValidationRules, signUpValidationRules } from '../../rules/validation-rules';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';

dotenv.config()

const user = new UserModel();
const users = express.Router()

// Users index
users.get('/', currentUser, requireAuth, async (req: Request, res: Response) => {  
  const result = await user.index();
  return res.status(200).json(result)
})

// Show user by id
users.get('/:id', currentUser, requireAuth, async (req: Request, res: Response) => {
  const id = (req.params.id as unknown) as number
  const result = await user.show(id);
  return res.status(200).json(result)
})

// Get current authenticated user
users.get('/auth/current', currentUser, requireAuth,  (req: Request, res: Response) => {
  res.send({ currentUser: req.currentUser || null });
});

// Sign up
users.post(
  '/', 
  signUpValidationRules,
  validateRequest,
  async (req: Request, res: Response) => {

  const result = await user.create({
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password
  });

  const userJwt = jwt.sign(
    {
      id: result.id,
      email: result.email,
    }, 
    process.env.JWT_KEY!
  );

  req.session = {
    jwt: userJwt
  }

  return res.status(201).json({
    id: result.id,
    email: result.email,
    first_name: result.first_name,
    last_name: result.last_name,
  })
})

// Sign in
users.post(
  '/signin',
  signInValidationRules,
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await user.findByEmail(email);

    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordsMatch = await Password.compare(
      existingUser.password!,
      password
    );

    if (!passwordsMatch) {
      throw new BadRequestError('Invalid Credentials');
    }

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt
    };

    res.status(200).send({
      token: userJwt,
      user: {
        id: existingUser.id,
        email: existingUser.email,
        first_name: existingUser.first_name,
        last_name: existingUser.last_name,
      }
    });
  }
);

// Logout
users.post('/signout', (req: Request, res: Response) => {
  req.session = null;

  res.send({});
});


export default users