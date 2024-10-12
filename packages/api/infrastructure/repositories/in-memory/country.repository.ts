/* eslint-disable require-await */
import { Country } from 'domain/entities/country/country'
import { CountryRepository } from 'domain/interfaces/country.repository'

export class CountryInMemoryRepository implements CountryRepository {
  private countriesMap = new Map<string, Country>()

  constructor(private readonly throwError?: { message: string }) {}

  private throwCustomError(): void {
    if (this.throwError?.message) {
      throw new Error(this.throwError.message)
    }
  }

  private hasName(value: string): (country: Country) => boolean {
    return function (country: Country) {
      return country.country.toLowerCase().includes(value.toLowerCase())
    }
  }

  async findAll(search?: string): Promise<Country[]> {
    this.throwCustomError()

    const countries = Array.from(this.countriesMap.values())

    if (!search) {
      return countries
    }

    return countries.filter(this.hasName(search))
  }

  async findById(id: string): Promise<Country | null> {
    this.throwCustomError()

    return Promise.resolve(this.countriesMap.get(id) ?? null)
  }

  async addCountry(country: Country): Promise<void> {
    if (!this.countriesMap.get(country.countryisocode)) {
      this.countriesMap.set(country._id, country)
    }
  }
}
