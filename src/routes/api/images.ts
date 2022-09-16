import express, { Request, Response } from 'express'
import sharp from 'sharp';
import path from 'path';
import { existsSync } from 'fs';
import { query, validationResult } from 'express-validator';
import RequestValidationError from '../../errors/request-validation-error';
import ServerError from '../../errors/server-error';
import { srcImageExist } from '../../utilities/imageExist';

const images = express.Router();

const validationRoles = [
  query('filename').isString().withMessage('File name is required.'),
  query('width').isString().withMessage('Width is required.'),
  query('height').isString().withMessage('Height is required.'),
]

images.get(
  '/', 
  validationRoles,
  async (req: Request, res: Response) => {

  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array())
  }

  const filename = req.query.filename as string
  const width = req.query.width as string
  const height = req.query.height as string

  const srcLoc = path.resolve('./') + `/assets/full/${filename}.jpeg`
  const outLoc = path.resolve('./') + `/assets/thumb/${filename}_${width}_${height}.jpg`

  if (srcImageExist(srcLoc) && existsSync(outLoc)) {    
    return res.status(200).sendFile(outLoc);
  }

  try {
    await sharp(srcLoc)
      .resize(parseInt(width), parseInt(height))
      .toFile(`${outLoc}`)
    return res.status(200).sendFile(outLoc);
  } catch (e) {
    throw new ServerError();
  }
});

export default images;