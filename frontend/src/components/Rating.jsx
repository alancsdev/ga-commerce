import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ value, text, className }) => {
  const renderStars = () => {
    const stars = [];
    const roundedValue = Math.round(value * 2) / 2; // Round the value to the nearest half star

    for (let i = 0; i < 5; i++) {
      if (roundedValue >= i + 1) {
        stars.push(<FaStar key={i} />);
      } else if (roundedValue >= i + 0.5) {
        stars.push(<FaStarHalfAlt key={i} />);
      } else {
        stars.push(<FaRegStar key={i} />);
      }
    }

    return stars;
  };

  return (
    <div className={`rating flex items-center ${className}`}>
      {renderStars()}
      <span className="rating-text">{text && `${text} reviews`}</span>
    </div>
  );
};

export default Rating;
