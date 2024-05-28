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
const express_1 = __importDefault(require("express"));
const playwright_1 = require("playwright");
const constants_1 = require("./constants");
const app = (0, express_1.default)();
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('test');
}));
app.get('/scraper', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield playwright_1.chromium.launch({ headless: false });
    const page = yield browser.newPage();
    try {
        yield page.goto(constants_1.IOL_URL);
        yield page.locator('#usuario').fill(process.env.IOL_EMAIL);
        yield page.locator('#password').fill(process.env.IOL_PASSWORD);
        // await page.locator('').click()
    }
    catch (e) {
        console.error(e);
    }
    yield browser.close();
    res.send('Un éxito mi pana');
}));
app.listen(constants_1.PORT, () => console.log(`Server running on port http://localhost:${constants_1.PORT}`));
