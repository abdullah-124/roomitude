import { AiFillStar, AiOutlineStar, AiTwotoneStar } from "react-icons/ai";

export default function StarRating({ rating, className }) {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);

  return (
    <div className={`${className} flex items-center space-x-1`}>
      {/* Full stars */}
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <AiFillStar key={`full-${i}`} />
        ))}

      {/* Half star */}
      {halfStar && <AiTwotoneStar key="half" />}

      {/* Empty stars */}
      {Array(emptyStars)
        .fill(0)
        .map((_, i) => (
          <AiOutlineStar key={`empty-${i}`} />
        ))}
        <span>({rating})</span>
    </div>
  );
}
