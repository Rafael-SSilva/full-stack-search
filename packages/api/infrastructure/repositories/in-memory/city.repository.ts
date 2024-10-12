/* eslint-disable require-await */
import { CityRepository } from 'domain/interfaces/city.repository'
import { City } from 'shared'

export class CityInMemoryRepository implements CityRepository {
  private citiesMap = new Map<string, City>()

  constructor(private readonly throwError?: { message: string }) {}

  private throwCustomError(): void {
    if (this.throwError?.message) {
      throw new Error(this.throwError.message)
    }
  }

  private hasName(value: string): (city: City) => boolean {
    return function (city: City) {
      return city.name.toLowerCase().includes(value.toLowerCase())
    }
  }

  async findAll(search?: string): Promise<City[]> {
    this.throwCustomError()

    const cities = Array.from(this.citiesMap.values())

    if (!search) {
      return cities
    }

    return cities.filter(this.hasName(search))
  }

  async findById(id: string): Promise<City | null> {
    this.throwCustomError()

    return Promise.resolve(this.citiesMap.get(id) ?? null)
  }

  async addCity(city: City): Promise<void> {
    if (!this.citiesMap.get(city.name)) {
      this.citiesMap.set(city._id, city)
    }
  }
}
