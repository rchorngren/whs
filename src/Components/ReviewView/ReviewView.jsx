import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import './ReviewView.css'


function ReviewView() {
    const [reviewActive, setreviewActive] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const ratingStars = [1, 2, 3, 4, 5]

    function StarIcon (props) {
        const {fill = 'none'} = props
        return (
            <svg className="w-6 h-6" fill={fill} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
            </svg>
        )
    }

    function Rating(props) {
        const {
            index,
            rating, 
            hoverRating,
            onMouseEnter,
            onMouseLeave,
            onSaveRating
        } = props;
        const fill = React.useMemo(() => {
            if (hoverRating >= index) {
                return 'yellow';
            } else if (!hoverRating && rating >= index){
                return 'yellow';
            }
            return 'none';
        }, [rating, hoverRating, index])
        return (
            <div 
            onMouseEnter={() => onMouseEnter(index)} 
            onMouseLeave={() => onMouseLeave()} 
            onClick={() => onSaveRating(index)}>
            <StarIcon fill={fill} />
            </div>
        )
    }

    const onMouseEnter = (index) => {
        setHoverRating(index);
    }

    const movieToReviewId = useSelector(state => state.movieToReview.id);

    useEffect(() => {
        console.log('movieToReviewId: ', movieToReviewId);
    }, [movieToReviewId]);
    
    const onMouseLeave = () => {
        setHoverRating(0);
    }

    const onSaveRating = (index) => {
        setRating(index)
    }
    if(reviewActive) {
        return (
            <div className="review-view-component">
                <div className="review-view-container">
                     <div className="review-header-text">Review</div>
                    <div className="review-subheader-text">Your review has been submitted successfully!<br />
                    Thank you!
                    </div>
                    <button className="review-submit" onClick={() => {
                        setreviewActive(!reviewActive)
                        setIsChecked(false)
                    }}>GO BACK</button>
                </div>
               
            </div>
          
        )
    }
    
    return (
        <div className="review-view-component">
            <div className="review-view-container">
                <div className="review-header-text">Review</div>
                <div className="review-subheader-text">Submit your review of 'INSERT MOVIE TITLE' here</div>
                <div className="review-container">
                    <textarea className="review-input-field" placeholder="Leave your review here..." />
                </div>
                <div className="review-subheader-text">Rate the Movie</div>
                {/* rating system here */}
                <div className="review-rating-container">
                    {ratingStars.map((index) => {
                        return (
                            <Rating 
                            index={index} 
                            rating={rating} 
                            hoverRating={hoverRating} 
                            onMouseEnter={onMouseEnter} 
                            onMouseLeave={onMouseLeave} 
                            onSaveRating={onSaveRating}
                            key={index} />
                        )
                    })}
                    
                </div>
                <div className="review-terms">
                    <input type="checkbox" className="review-checkbox" onChange={() => setIsChecked(!isChecked)} />
                    <div className="review-terms-text">By checking the box you are agreeing to all terms etc...</div>
                </div>
                <button className="review-submit" onClick={() => {
                    if(isChecked && rating > 0) {
                        setreviewActive(!reviewActive)
                    } else {
                        //return error
                        
                    }
                }}>SUBMIT</button>
            </div>
        </div>
    )
}

export default ReviewView
