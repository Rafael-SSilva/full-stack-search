import { City } from 'shared'

export interface CityRepository {
  findAll(search?: string): Promise<City[]>
  findById(id: string): Promise<City | null>
}
