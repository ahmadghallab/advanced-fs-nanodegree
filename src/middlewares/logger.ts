import expres, { Request, Response } from 'express';

const logger = (req: Request, res: Response, next: Function): void => {
  let url = req.url;
  console.log(`${url} was visited`);
  next();
}

export default logger;