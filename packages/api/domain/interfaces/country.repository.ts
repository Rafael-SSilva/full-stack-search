import { Country } from 'domain/entities/country/country'

export interface CountryRepository {
  findAll(search?: string): Promise<Country[]>
  findById(id: string): Promise<Country | null>
}
