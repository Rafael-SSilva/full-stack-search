import { randomUUID } from 'crypto'
import { Country } from 'domain/entities/country/country'

export const mockCountries: Country[] = [
  { country: 'Belgium', countryisocode: 'BE', _id: randomUUID() },
  { country: 'Bulgaria', countryisocode: 'BG', _id: randomUUID() },
  { country: 'Chile', countryisocode: 'CL', _id: randomUUID() },
  { country: 'China', countryisocode: 'CN', _id: randomUUID() },
]
