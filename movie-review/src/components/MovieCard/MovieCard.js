import React, { useState } from 'react';
import { Button, Card ,Modal} from 'antd';
import MoviewReviewCard from '../MovieReviewCard/MovieReviewCard';
import { getMovieReview } from '../../services/review';
import { deleteMovie } from '../../services/movie';

const MovieCard = ({ movie,handleGetAllMovies }) => {
  const [reviewDetails,setReviewDetails] = useState([]);
  const [showReviewDetails,setShowReviweDetails] = useState(false);
  const { _id, name, releaseDate, averageRating } = movie;

  const handleCloseReviewModal =() => {
    setShowReviweDetails(false);
  }
  const handleCardClick = async () => {
    const reviews = await getMovieReview(_id);
    setReviewDetails(reviews);
    setShowReviweDetails(true);
  };
  const handleMovieDelete =async ()=>{
    const response = await deleteMovie(_id);
    handleGetAllMovies();
  }

  return (
    <div>
      <Card title={name} extra={averageRating !== null ? `${averageRating}/10` : '0/10'} style={{ width: 300, margin: 16 }} >
      <p>Release Date: {new Date(releaseDate).toLocaleDateString()}</p>

      <Button onClick={handleCardClick}  style={{"margin-right":"1rem"}}>Get Reviews</Button>
      <Button onClick={handleMovieDelete}>Remove</Button>


      <Modal
        title={`${name} Review Details`}
        open={showReviewDetails}
        onCancel={handleCloseReviewModal}
        footer={null}
      >
        {reviewDetails.length >0 ?reviewDetails.map((review,index)=>{
          return <MoviewReviewCard review={review} key={index} />
        }):
        <>
          <p>No Review added !!</p>
        </>}
      </Modal>
    </Card>
    </div>
    
  );
};

export default MovieCard;
