import { useState, useEffect } from "react"
import { Hotel, Country, City } from "shared"
import { getHotels } from "../services/hotel-services"
import { getCountries } from "../services/country-services"
import { getCities } from "../services/city-services"

export function useSearchResults(debouncedValue: string, setInputValue: (value: string) => void) {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [countries, setCountries] = useState<Country[]>([])
  const [cities, setCities] = useState<City[]>([])

  const clearResults = () => {
    setHotels([])
    setCountries([])
    setCities([])
  }

  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedValue) {
        clearResults()

        return clearResults
      }

      const [hotels, countries, cities] = await Promise.all([
        getHotels(debouncedValue),
        getCountries(debouncedValue),
        getCities(debouncedValue),
      ])

      setHotels(hotels ?? [])
      setCountries(countries ?? [])
      setCities(cities ?? [])
    }

    fetchResults()

    return clearResults
  }, [debouncedValue])

  const clearSearch = () => {
    setInputValue("")
    clearResults()
  }

  return {
    hotels,
    countries,
    cities,
    clearSearch,
  }
}
