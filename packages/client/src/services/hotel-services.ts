import { Hotel } from "shared"
import { API_URL } from "../utils/app-utils"

export const getHotels = async (query: string): Promise<Hotel[]> => {
  const hotelsData = await fetch(
    `${API_URL}/hotels?hotel=${encodeURIComponent(query)}`
  )
  
  const hotels: Hotel[] = await hotelsData.json()
 
  return hotels
}

export const getHotelById = async (hotelId: string): Promise<Hotel | null> => {
    const hotelData = await fetch(`${API_URL}/hotels/${hotelId}`)
    const hotel: Hotel = await hotelData.json()

    if(!hotelData.ok){
      return null
    }
  
    return hotel
  }