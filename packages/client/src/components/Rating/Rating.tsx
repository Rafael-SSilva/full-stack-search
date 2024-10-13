import { RatingStars } from './RatingStars'

interface RatingProps {
    rating?: number
  }

export const Rating = ({ rating = 0}: RatingProps): JSX.Element => {  
  return (
    <div className="star-rating">
      <div className="stars-wrapper">
      {Array.from({ length: Math.ceil(rating) }, (_, index) => {
        const star = index + 1
        const shape = Math.ceil(rating) === star && (rating % 1) > 0 ? 'half' : 'full'

        return (
            <RatingStars key={`shape-${star}`} starShape={shape}/>
        )
        })}
      </div>
      <p>{rating} Stars</p>
    </div>
  )
  }