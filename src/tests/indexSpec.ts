import supertest from "supertest";
import app from "..";
import { srcImageExist } from "../utilities/imageExist";

const request = supertest(app)

describe('Test endpoint responses', () => {
  it('gets the image resize endpoint', async () => {
    const response = await request.get('/api/images?filename=image1&width=200&height=200');
    expect(response.status).toBe(200);
  });
});

describe('Test if the source image exists', () => {
  it('srcImageExist func should be defined', async () => {
    expect(srcImageExist).toBeDefined;
  })
})