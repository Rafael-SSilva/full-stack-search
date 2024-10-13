
interface RatingStarProps {
    starShape?: string
} 

export const RatingStars = ({  starShape }: RatingStarProps) => {
  return (
      <span className={`star-${starShape}`}>
        &#9733;
      </span>
    )

}
