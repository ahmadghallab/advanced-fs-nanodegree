import { existsSync } from "fs";
import NotFoundError from "../errors/not-found-error";

export function srcImageExist(srcLoc: string): boolean {
  if (existsSync(srcLoc)) {
    return true
  }
  throw new NotFoundError('Source image not found');
}