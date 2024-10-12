import { CityRepository } from 'domain/interfaces/city.repository'
import { FindCityUseCase } from 'use-cases/city/find-city'
import { ListCitiesUseCase } from 'use-cases/city/list-cities'

export interface CityContainer {
  getListCitiesUseCase: () => ListCitiesUseCase
  getFindCityUseCase: () => FindCityUseCase
}

export function cityContainer(cityRepository: CityRepository): CityContainer {
  function getListCitiesUseCase(): ListCitiesUseCase {
    return new ListCitiesUseCase(cityRepository)
  }

  function getFindCityUseCase(): FindCityUseCase {
    return new FindCityUseCase(cityRepository)
  }

  return {
    getFindCityUseCase,
    getListCitiesUseCase,
  }
}
