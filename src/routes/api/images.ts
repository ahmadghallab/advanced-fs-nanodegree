import express, { Request, Response } from 'express'
import sharp from 'sharp';
import path from 'path';
import { existsSync } from 'fs';

const images = express.Router();

images.get('/', async (req: Request, res: Response) => {

  const filename = req.query.filename as string
  const width = req.query.width as string
  const height = req.query.height as string

  const srcLoc = path.resolve('./') + `/assets/full/${filename}.jpeg`
  const outLoc = path.resolve('./') + `/assets/thumb/${filename}.jpeg`

  if (!existsSync(srcLoc)) {
    return res.status(404).send('File does not exist');
  }

  try {
    await sharp(srcLoc)
      .resize(parseInt(width), parseInt(height))
      .toFile(`${outLoc}`)
    return res.sendFile(outLoc);
  } catch (e) {
    return res.status(500).send('Something went wrong');
  }
});

export default images;