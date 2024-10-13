import { City } from "shared"
import { API_URL } from "../utils/app-utils"

export const getCities = async (query: string): Promise<City[]> => {
  const citiesData = await fetch(
    `${API_URL}/cities?city=${encodeURIComponent(query)}`
  )
  
  const cities: City[] = await citiesData.json()
 
  return cities
}

export const getCityById = async (cityId: string): Promise<City | null> => {
    const cityData = await fetch(`${API_URL}/cities/${cityId}`)
    const city: City = await cityData.json()

    if(!cityData.ok){
      return null
    }

    return city
  }