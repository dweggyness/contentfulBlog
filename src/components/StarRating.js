import React from "react"
import styled from "styled-components"
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

// component that displays a standard star rating as typically seen on shopping sites ( amazon, ebay )
// rating: Float, between 0.0 to 5.0. has to be multiples of 0.5
// returns a horizontal star rating bar. defaults to 5 empty stars if { rating } is invalid.

const StarContainer = styled.div`
    display: flex;
`

export default function StarRating({ rating }) {
    if (rating < 0 || rating > 5 || rating % 0.5 !== 0) {
        return (
            <StarContainer>
                {Array.from({ length: 5 }).forEach((_, index) => 
                    <FaRegStar key={index} />
                )};
            </StarContainer>
        )
    }

    const numberOfFullStars = Math.floor(rating);
    const numberOfHalfStars = (rating - numberOfFullStars > 0) ? 1 : 0;
    const numberOfEmptyStars = 5 - numberOfFullStars - numberOfHalfStars;

    console.log('stars: ', numberOfFullStars, numberOfHalfStars, numberOfEmptyStars);
    
    return ( 
        <StarContainer>
            {Array.from({ length: numberOfFullStars }).map((_, index) => 
                <FaStar key={index} />
            )}
            {Array.from({ length: numberOfHalfStars }).map((_, index) => 
                <FaStarHalfAlt key={index} />
            )}
            {Array.from({ length: numberOfEmptyStars }).map((_, index) => 
                <FaRegStar key={index} />
            )}
        </StarContainer>
    )
}