import path from 'path'
import supertest from 'supertest'
import app from '..'
import { imageResize } from '../services/imageResize'
import { imageExist } from '../utilities/imageExist'

const request = supertest(app)

describe('Test endpoint responses', () => {
    it('gets the image resize endpoint', async () => {
        const response = await request.get(
            '/api/images?filename=image1&width=200&height=200'
        )
        expect(response.status).toBe(200)
    })
})

describe('Test if the source image exists', () => {
    it('imageExist func should be defined', async () => {
        expect(imageExist).toBeDefined
    })
})

describe('Test image resize functionality', () => {
    it('imageResize func should return true', async () => {
        const height = '200'
        const width = '200'
        const srcLoc = path.resolve('./') + `/assets/full/image1.jpeg`
        const outLoc =
            path.resolve('./') + `/assets/thumb/image1_${width}_${height}.jpg`

        expect(await imageResize(srcLoc, outLoc, width, height)).toBe(true);
    })
})
