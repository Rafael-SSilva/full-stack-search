import { Hotel } from 'domain/entities/hotel/hotel'

export interface HotelRepository {
  findAll(search?: string): Promise<Hotel[]>
  findById(id: string): Promise<Hotel | null>
}
