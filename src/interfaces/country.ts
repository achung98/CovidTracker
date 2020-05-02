export interface Country {
  [country: string]: {
    lat: number,
    lon: number,
    cases: number,
    today: number,
    dead: number,
    cured: number
  }
}
