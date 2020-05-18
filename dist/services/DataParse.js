"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
/*
  Singleton class with the responsability of parsing the incoming data
*/
class DataParse {
    constructor() {
        this.lastUpdate = moment_1.default(new Date()).format('YYYY-MM-DD');
        // As a cache
        this.countriesData = {};
        this.specCountryData = {};
    }
    static getInstace() {
        if (this.dataParse == undefined || this.dataParse == null) {
            this.dataParse = new DataParse();
        }
        return this.dataParse;
    }
    getCountriesData() {
        return this.countriesData;
    }
    getSpecCountryData() {
        return this.specCountryData;
    }
    checkLastUpdate(date) {
        return date === this.lastUpdate;
    }
    /*
      Parse the coronavirus data retrieved from all countries
    */
    parseCountries(data) {
        data.forEach((ele, i) => {
            if (i !== 0) {
                this.countriesData[`${ele.countryInfo.iso3}`] = {
                    'lat': ele.countryInfo.lat,
                    'lon': ele.countryInfo.long,
                    'cases': ele.cases,
                    'today': ele.todayCases,
                    'dead': ele.deaths,
                    'cured': ele.recovered,
                    'iso': ele.countryInfo.iso3
                };
            }
        });
    }
    /*
      Parase coronavirus data per country provinces
    */
    parseProvinces(data, country) {
        this.specCountryData[`${country}`] = [];
        let countryCases = this.countriesData[`${country}`].cases || 1;
        data.forEach((ele) => {
            this.specCountryData[`${country}`].push({
                'province': ele.region.province,
                'lat': ele.region.lat,
                'lon': ele.region.long,
                'cases': ele.confirmed,
                'dead': ele.deaths,
                'cured': ele.recovered,
                'rate': ele.fatality_rate,
                'perc': (ele.confirmed / countryCases) * 100
            });
        });
    }
}
exports.DataParse = DataParse;
