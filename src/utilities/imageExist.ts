import { existsSync } from 'fs'
import NotFoundError from '../errors/not-found-error'

export function imageExist(srcLoc: string, outLoc: string): boolean {
    if (existsSync(srcLoc) && existsSync(outLoc)) {
        return true
    }
    throw new NotFoundError('Source image not found')
}
