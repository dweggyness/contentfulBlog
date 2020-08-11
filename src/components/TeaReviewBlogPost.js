import React, { useState } from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { StarRating } from '.';
import { Link } from "gatsby" // highlight-line
import colors from "../constants/colors";

const PostContainer = styled.article`
  display: grid;
  grid-template-columns: 0.5fr 3fr 0.5fr;
  grid-template-rows: 2.5fr minmax(0.1fr, auto) 125px;
`

const PostImageContainer = styled(Link)`
  grid-area: 1 / 1 / 3 / 4;
`

const PostTitleContainer = styled.h4`
  grid-area: 2 / 2 / 3 / 3;
  display: grid;
  z-Index: 2;

  position: relative;
  margin: 0;
  font-weight: 400;
  font-size: 18px;
  background-color: ${props => props.isHovered ? `rgba(196, 230, 195, 0.85)` : `rgba(255, 255, 255, 0.85)`};
  transition: 0.15s;
  padding: 20px 25px 15px;
  pointer-events: none;
`

const PostLabel = styled.h3`
  font-family: 'Raleway';
  font-size: 12px;
  font-weight: 500;
  color: white;

  display: block;
  position: absolute;
  top: -10px;
  left: 25px;
  margin: 0;
  padding: 4px 10px;
  background-color: ${colors.darkgreen};
`

const PostDetailsContainer = styled.div`
  grid-area: 3 / 2 / 4 / 3;
  display: grid;
  grid-template: 1fr / repeat(3, auto);
  
  border-top: 1px solid ${colors.darkgreen};
  margin: 0 5px;
`

const PostDetail = styled.div`
  display: grid;
  align-items: center;
  border-left: 1px solid ${colors.darkgreen};
  border-collapse: collapse;
  padding: 3px 6px;
`

const DetailTitle = styled.p`
  font-family: 'Raleway';
  font-weight: 300;
  font-size: 12px;
  margin: 0;
`

const DetailContent = styled(DetailTitle)`
  font-weight: 600;
`

export default function TeaReviewBlogPost({ thumbnail, title, slug, teaType, teaPrice, teaRating }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <PostContainer>
      <PostImageContainer 
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        to={`/tea-reviews/${slug}`}
      >
        <Img
          fluid={thumbnail.fluid} 
          key={thumbnail.fluid.src}
          imgStyle={{ objectFit: 'contain' }}
          alt={thumbnail.title}
        />
      </PostImageContainer>
      <PostTitleContainer
        isHovered={isHovered}
      >
        <PostLabel>REVIEW</PostLabel> 
        {title}
      </PostTitleContainer>
      <PostDetailsContainer>
        <PostDetail style={{ borderLeft: 'none' }}>
          <DetailTitle>Type</DetailTitle>
          <DetailContent>
            {teaType}
          </DetailContent>
        </PostDetail>
        <PostDetail>
          <DetailTitle>Price</DetailTitle>
          <DetailContent>
            {`RM${teaPrice.toFixed(2)}/g`}
          </DetailContent>
        </PostDetail>
        <PostDetail>
          <DetailTitle>Rating</DetailTitle>
          <DetailContent>
            <StarRating rating={teaRating} />
          </DetailContent>
        </PostDetail>
      </PostDetailsContainer>
    </PostContainer>
  )
}