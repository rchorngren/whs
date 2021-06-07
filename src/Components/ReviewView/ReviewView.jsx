import React, { useState } from 'react'
import './ReviewView.css'


function ReviewView() {
    const [reviewActive, setreviewActive] = useState(false)
    const [isChecked, setIsChecked] = useState(false)

    
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
                <div className="review-terms">
                    <input type="checkbox" className="review-checkbox" onChange={() => setIsChecked(!isChecked)} />
                    <div className="review-terms-text">By checking the box you are agreeing to all terms etc...</div>
                </div>
                <button className="review-submit" onClick={() => {
                    if(isChecked) {
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
