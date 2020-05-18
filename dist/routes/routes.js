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
const moment_1 = __importDefault(require("moment"));
const DataParse_1 = require("../services/DataParse");
const router = express_1.default.Router();
exports.router = router;
const fetch = require('node-fetch');
router.get('/global', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let parsedDate = moment_1.default(new Date()).subtract(2, 'day').format('YYYY-MM-DD');
    try {
        let f = yield fetch(`https://covid-api.com/api/reports/total?date=${parsedDate}`);
        let data = yield f.json();
        res.status(200).json(data.data);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
router.get('/countries', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let f = yield fetch('https://corona.lmao.ninja/v2/countries?yesterday&sort');
        let data = yield f.json();
        let dataParse = DataParse_1.DataParse.getInstace();
        if (!dataParse.getCountriesData().size || !dataParse.checkLastUpdate(moment_1.default(new Date()).format('YYYY-MM-DD'))) {
            dataParse.parseCountries(data);
        }
        res.status(200).send(dataParse.getCountriesData());
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
router.get('/country/:country', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let url = `https://covid-api.com/api/reports?iso=${req.params.country}`;
    try {
        let f = yield fetch(url);
        let data = yield f.json();
        let dataParse = DataParse_1.DataParse.getInstace();
        if (dataParse.getSpecCountryData()[`${req.params.country}`] === undefined || !dataParse.checkLastUpdate(moment_1.default(new Date()).format('YYYY-MM-DD'))) {
            dataParse.parseProvinces(data.data, req.params.country);
        }
        res.status(200).json(dataParse.getSpecCountryData()[`${req.params.country}`]);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
