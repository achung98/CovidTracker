import { Country } from '../interfaces/country';
import { SpecificCountry } from '../interfaces/specific_country';

import moment from 'moment';

/*
  Singleton class with the responsability of parsing the incoming data
*/
export class DataParse {
  private static dataParse: any;
  private lastUpdate = moment(new Date()).format('YYYY-MM-DD');
  // As a cache
  private countriesData: any = {};
  private specCountryData: any = {};

  private constructor() {}

  public static getInstace() {
    if(this.dataParse == undefined || this.dataParse == null) {
      this.dataParse = new DataParse();
    }
    return this.dataParse;
  }

  public getCountriesData(): Map<string, Country> {
    return this.countriesData;
  }

  public getSpecCountryData(): SpecificCountry[] {
    return this.specCountryData;
  }

  public checkLastUpdate(date: any): boolean {
    return date === this.lastUpdate;
  }

  /*
    Parse the coronavirus data retrieved from all countries
  */
  public parseCountries(data: any): void {
    data.forEach((ele: any, i: number) => {
      if(i !== 0) {
        this.countriesData[`${ele.countryInfo.iso3}`] = {
          'country': ele.country,
          'lat': ele.countryInfo.lat,
          'lon': ele.countryInfo.long,
          'cases': ele.cases,
          'today': ele.todayCases,
          'dead': ele.deaths,
          'cured': ele.recovered,
          'iso': ele.countryInfo.iso3
        };
      }
    })
  }

  /*
    Parase coronavirus data per country provinces
  */
  public parseProvinces(data: any, country: string): void {
    this.specCountryData[`${country}`] = [];
    let countryCases: number = this.countriesData[`${country}`].cases || 1;
    data.forEach((ele: any) => {
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
    })
  }
}
