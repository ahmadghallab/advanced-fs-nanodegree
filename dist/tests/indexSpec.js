"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const supertest_1 = __importDefault(require("supertest"));
const __1 = __importDefault(require(".."));
const imageResize_1 = require("../services/imageResize");
const imageExist_1 = require("../utilities/imageExist");
const request = (0, supertest_1.default)(__1.default);
describe('Test endpoint responses', () => {
    it('gets the image resize endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=image1&width=200&height=200');
        expect(response.status).toBe(200);
    }));
});
describe('Test if the source image exists', () => {
    it('imageExist func should be defined', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(imageExist_1.imageExist).toBeDefined;
    }));
});
describe('Test image resize functionality', () => {
    it('imageResize func should return true', () => __awaiter(void 0, void 0, void 0, function* () {
        const height = '200';
        const width = '200';
        const srcLoc = path_1.default.resolve('./') + `/assets/full/image1.jpeg`;
        const outLoc = path_1.default.resolve('./') + `/assets/thumb/image1_${width}_${height}.jpg`;
        expect(yield (0, imageResize_1.imageResize)(srcLoc, outLoc, width, height)).toBe(true);
    }));
});
