"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
  Singleton class with the responsability of parsing the incoming data
*/
class DataParse {
    constructor() {
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
    /*
      Parse the coronavirus data retrieved from all countries
    */
    parseCountries(data) {
        data.forEach((ele, i) => {
            if (i !== 0) {
                this.countriesData[`${ele.country}`] = {
                    'lat': ele.countryInfo.lat,
                    'lon': ele.countryInfo.long,
                    'cases': ele.cases,
                    'today': ele.todayCases,
                    'dead': ele.deaths,
                    'cured': ele.recovered
                };
            }
        });
    }
    /*
      Parase coronavirus data per country provinces
    */
    parseProvinces(data, country) {
        var _a;
        this.specCountryData[`${country}`] = [];
        let countryCases = ((_a = this.countriesData[`${country}`]) === null || _a === void 0 ? void 0 : _a.cases) || 1;
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
