import express, { Request, Response } from 'express';
import moment from 'moment';
import { DataParse } from '../services/DataParse';

const router = express.Router();
const fetch = require('node-fetch');

router.get('/global', async (req: Request, res: Response) => {
  let parsedDate = moment(new Date()).subtract(2, 'day').format('YYYY-MM-DD');
  try {
    let f = await fetch(`https://covid-api.com/api/reports/total?date=${parsedDate}`);
    let data = await f.json();
    res.status(200).json(data.data);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.get('/countries', async (req: Request, res: Response) => {
  try {
    let f = await fetch('https://corona.lmao.ninja/v2/countries?yesterday&sort');
    let data = await f.json();
    let dataParse = DataParse.getInstace();
    if(!dataParse.getCountriesData().size || !dataParse.checkLastUpdate(moment(new Date()).format('YYYY-MM-DD'))) {
      dataParse.parseCountries(data);
    }

    res.status(200).send(dataParse.getCountriesData());
  } catch(err) {
    res.status(500).json(err);
  }
})

router.get('/country/:country', async (req: Request, res: Response) => {
  let url = `https://covid-api.com/api/reports?iso=${req.params.country}`;
  try {
    let f = await fetch(url);
    let data = await f.json();
    let dataParse = DataParse.getInstace();
    if(dataParse.getSpecCountryData()[`${req.params.country}`] === undefined || !dataParse.checkLastUpdate(moment(new Date()).format('YYYY-MM-DD'))) {
      dataParse.parseProvinces(data.data, req.params.country);
    }

    res.status(200).json(dataParse.getSpecCountryData()[`${req.params.country}`]);
  } catch(err) {
    res.status(500).json(err);
  }
});

export { router };
