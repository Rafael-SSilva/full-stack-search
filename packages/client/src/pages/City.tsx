import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { City } from "shared"
import { getCityById } from "../services/city-services"
import { BoxWrapper } from "../components/BoxWrapper"

export default function CityDetails() {
  const { id } = useParams<{ id: string }>()

  const [city, setCity] = useState<City | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCityDetails = async () => {
      if (!id) return;
  
      try {
        setLoading(true);
        const fetchedCity = await getCityById(id);
        setCity(fetchedCity);
      } catch (err: unknown) {
        const errorMessag = (err instanceof Error) ? err.message: ''
        setError(errorMessag);
      } finally {
        setLoading(false)
      }
    }

    fetchCityDetails()
  }, [id]);

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

  if (!city)
    return (
      <BoxWrapper>
        <h3 className="text-center">No city found</h3>
      </BoxWrapper>
    )

  return (
    <BoxWrapper>
      <h1 className="mb-4">{city.name}</h1>
      <div className="mb-3">
        <p>
          <strong>City:</strong> {city.name}
        </p>
      </div>
    </BoxWrapper>
  )
}
