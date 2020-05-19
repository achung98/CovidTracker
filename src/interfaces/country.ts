export interface Country {
  [country: string]: {
    country: string,
    lat: number,
    lon: number,
    cases: number,
    today: number,
    dead: number,
    cured: number,
    iso: string
  }
}
