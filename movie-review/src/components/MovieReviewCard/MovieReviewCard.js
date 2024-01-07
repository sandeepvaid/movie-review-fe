import React from "react";
import './MovieReviewCard.css'
const MoviewReviewCard = ({review})=>{
    return (
        <div className="review-card">
            <div className="review-left">
                {review?.comments && <p>{review?.comments}</p>}
                <br />
                <i><p>{review?.reviewerName}</p></i>
            </div>
            <div className="review-right">
                <h4>{review.rating}/10</h4>
            </div>
            
        </div>
    )
}

export default MoviewReviewCard;