import express, { Request, Response } from 'express'
import path from 'path'
import { query, validationResult } from 'express-validator'
import RequestValidationError from '../../errors/request-validation-error'
import { imageExist } from '../../utilities/imageExist'

const images = express.Router()

const validationRoles = [
    query('filename').isString().withMessage('File name is required.'),
    query('width').isString().withMessage('Width is required.'),
    query('height').isString().withMessage('Height is required.'),
]

images.get('/', validationRoles, async (req: Request, res: Response) => {
    const errors = validationResult(req)
    const filename = req.query.filename as string
    const width = req.query.width as string
    const height = req.query.height as string
    const srcLoc = path.resolve('./') + `/assets/full/${filename}.jpeg`
    const outLoc =
        path.resolve('./') + `/assets/thumb/${filename}_${width}_${height}.jpg`

    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array())
    }

    if (imageExist(srcLoc, outLoc)) {
        return res.status(200).sendFile(outLoc)
    }

})

export default images
