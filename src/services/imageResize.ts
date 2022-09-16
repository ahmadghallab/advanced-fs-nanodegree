import sharp from "sharp"
import ServerError from "../errors/server-error"

export async function imageResize(srcLoc: string, outLoc: string, width: string, height: string) {

  try {
    await sharp(srcLoc)
      .resize(parseInt(width), parseInt(height))
      .toFile(`${outLoc}`)
    return true
  } catch (e) {
    throw new ServerError()
  }

}