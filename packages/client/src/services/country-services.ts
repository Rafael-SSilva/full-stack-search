import { Country } from "shared"
import { API_URL } from "../utils/app-utils"

export const getCountries = async (query: string): Promise<Country[]> => {
  const countriesData = await fetch(
    `${API_URL}/countries?country=${encodeURIComponent(query)}`
  )
  
  const countries: Country[] = await countriesData.json()
 
  return countries
}

export const getCountryById = async (countryId: string): Promise<Country | null> => {
    const countryData = await fetch(`${API_URL}/countries/${countryId}`)
    const country: Country = await countryData.json()

    if(!countryData.ok){
      return null
    }
    return country
  }