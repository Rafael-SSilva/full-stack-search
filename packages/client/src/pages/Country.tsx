import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Country } from "shared"
import { BoxWrapper } from "../components/BoxWrapper"
import { getCountryById } from "../services/country-services"

export default function CountryDetails() {
  const { id } = useParams<{ id: string }>()

  const [country, setCountry] = useState<Country | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchResults = async () => {
      if (!id) return

      try {
        setLoading(true)
        const fetchedCountry = await getCountryById(id)
        setCountry(fetchedCountry)
      } catch (err) {
        setError("Failed to fetch country details.")
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [id])

  if (loading)
    return (
      <BoxWrapper>
        <h3 className="text-center">Loading...</h3>
      </BoxWrapper>
    )

  if (error)
    return (
      <BoxWrapper>
        <p>{error}</p>
      </BoxWrapper>
    )

  if (!country)
    return (
      <BoxWrapper>
        <h3 className="text-center">No country found</h3>
      </BoxWrapper>
    )

  return (
    <BoxWrapper>
      <h1 className="mb-4">{country.country}</h1>
      <div className="mb-3">
        <p>
          <strong>Country:</strong> {country.country}
        </p>
        <p>
          <strong>ISO Code:</strong> {country.countryisocode}
        </p>
      </div>
    </BoxWrapper>
  )
}