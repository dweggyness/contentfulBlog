import React, { useContext, useState } from "react"
import styled, { ThemeContext } from "styled-components"
import Img from "gatsby-image"
import { StarRating } from '.';
import { Link } from "gatsby" // highlight-line
import { hexToRGBA } from '../utils/hexToRGBA';

const PostContainer = styled.article`
  display: grid;
  grid-template-columns: 0.5fr 3fr 0.5fr;
  grid-template-rows: 2.5fr 0.5fr 40px;

  width: 100%;
  height: 100%;
`

const PostImageContainer = styled(Link)`
  grid-area: 1 / 1 / 3 / 4;
`

const PostTitleContainer = styled.h3`
  grid-area: 2 / 2 / 3 / 3;
  display: grid;
  z-Index: 2;

  position: relative;
  margin: 0;
  font-weight: 400;
  font-size: 18px;
  background-color: ${props => props.isHovered 
    ? hexToRGBA(props.theme.primaryColor, 0.85) 
    : hexToRGBA(props.theme.backgroundColor, 0.85)};
  transition: 0.15s;
  padding: 20px 25px 15px;
  pointer-events: none;
`

const PostLabel = styled.span`
  font-family: 'Raleway';
  font-size: 12px;
  font-weight: ${props => props.theme.curTheme === 'light' ? 500 : 600};
  color: ${props => props.theme.curTheme === 'light' ? '#EEEEEE' : props.theme.secondaryColor};

  display: block;
  position: absolute;
  top: -10px;
  left: 25px;
  margin: 0;
  padding: 4px 10px;
  background-color: ${props => props.theme.curTheme === 'light' ? props.theme.secondaryColor : '#EEEEEE'};
  opacity: 1;
`

const PostDetailsContainer = styled.div`
  grid-area: 3 / 2 / 4 / 3;
  display: grid;
  grid-template: 1fr / repeat(3, auto);
  
  border-top: ${props => (`1px solid ${props.theme.textColor}`)};
  margin: 0 5px;
`

const PostDetail = styled.div`
  display: grid;
  align-items: center;
  border-left: ${props => (`1px solid ${props.theme.textColor}`)};
  border-collapse: collapse;
  padding: 3px 6px;
`

const DetailTitle = styled.p`
  font-family: 'Raleway';
  font-weight: 300;
  font-size: 11px;
  margin: 0;
`

const DetailContent = styled(DetailTitle)`
  font-weight: 600;
  font-size: 13px;
  white-space: nowrap;
`

export default function TeaReviewPost({ thumbnail, title, slug, teaType, teaRating, postCreationDate }) {
  const [isHovered, setIsHovered] = useState(false);
  const theme = useContext(ThemeContext);
  
  return (
    <PostContainer>
      <PostImageContainer 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        to={`/tea-reviews/${slug}`}
      >
        <Img
          fluid={{ ...thumbnail.fluid, aspectRatio: 1.377 }} 
          style={{ minHeight: 0, height: '100%' }}
          imgStyle={{ objectFit: 'cover' }}
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
          <DetailTitle>Date</DetailTitle>
          <DetailContent>
            {postCreationDate}
          </DetailContent>
        </PostDetail>
        <PostDetail>
          <DetailTitle>Type</DetailTitle>
          <DetailContent>
            {teaType}
          </DetailContent>
        </PostDetail>
        <PostDetail>
          <DetailTitle>Rating</DetailTitle>
          <DetailContent>
            <StarRating style={{ fontSize: 12 }} color={theme.textColor} rating={teaRating} />
          </DetailContent>
        </PostDetail>
      </PostDetailsContainer>
    </PostContainer>
  )
}