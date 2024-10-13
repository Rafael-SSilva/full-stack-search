import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Hotel } from "shared"
import { Rating } from "../components/Rating/Rating"
import { BoxWrapper } from "../components/BoxWrapper"
import { getHotelById } from "../services/hotel-services"
import { RenderProperty } from "../components/RenderProperty"

export default function HotelDetail() {
  const { id } = useParams<{ id: string }>()

  const [hotel, setHotel] = useState<Hotel | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchResults = async () => {
      if (!id) return

      try {
        setLoading(true)
        const fetchedHotel = await getHotelById(id)
        setHotel(fetchedHotel)
      } catch (err) {
        setError("Failed to fetch hotel details.")
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

  if (!hotel)
    return (
      <BoxWrapper>
        <h3 className="text-center">No hotel found</h3>
      </BoxWrapper>
    )

  return (
    <BoxWrapper>
      <h1 className="mb-4">{hotel.hotel_name}</h1>
      <div className="mb-3">
        <RenderProperty label="Chain Name:" content={hotel.chain_name}/>
        <RenderProperty label="Address Line 1:" content={hotel.addressline1}/>
        <RenderProperty label="Address Line 2:" content={hotel.addressline2}/>
        <RenderProperty label="City:" content={hotel.city}/>
        <RenderProperty label="State/Province:" content={hotel.state}/>
        <RenderProperty label="Zip/Postal Code:" content={hotel.zipcode}/>
        <RenderProperty label="Country:" content={`${hotel.country} (${hotel.countryisocode})`}/>
      </div>
      <div className="d-flex flex-column">
        <p className="m-0">
          <strong>Classification:</strong>
        </p>
        <Rating rating={hotel.star_rating} />
      </div>
    </BoxWrapper>
  )
}