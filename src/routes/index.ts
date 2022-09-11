import express from 'express'
import students from './api/students';
import teachers from './api/teachers';
import logger from '../middlewares/logger';

const routes = express.Router()

routes.get('/', logger, (req, res) => {
  res.send('main route')
});

routes.use('/students', students);
routes.use('/teachers', teachers);

export default routes;