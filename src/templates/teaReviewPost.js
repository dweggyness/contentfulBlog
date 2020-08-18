import React, { useContext } from "react"
import { graphql } from "gatsby"
import styled, { ThemeContext } from "styled-components";
import Image from "gatsby-image"
import { SeigahaBackground, TeaReviewPostDetails } from '../components';
import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import useContentfulImage from '../utils/useContentfulImage';

const PostContainer = styled.main`
  width: 55%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1024px) {
    width: 65%;
  }

  @media (max-width: 768px) {
    width: 85%;
  }
`

const ThumbnailContainer = styled.section`
  width: 40%;

  @media (max-width: 1024px) {
    width: 60%;
  }

  @media (max-width: 768px) {
    width: 80%;
  }
`

export default function ReviewPost({ data }) {
  const theme = useContext( ThemeContext )
  const post = data.contentfulTeaReviewPost

  return (
    <>
      <ThumbnailContainer>
        <Image 
          fluid={post.thumbnail.fluid}
          style={{ maxHeight: '400', height: '100%' }}
          imgStyle={{ objectFit: 'cover' }}
        />
        <TeaReviewPostDetails 
          color={theme.textColor}
          bgColor={theme.modalColor}
          teaSource={post.teaSource}
          teaName={post.teaName}
          teaType={post.teaType}
          teaPrice={post.pricePerGram}
          teaRating={post.rating}
          postCreationDate={post.updatedAt}
          brewingWaterAmount={post.brewingWaterAmount}
          brewingTemp={post.brewingTemp}
          brewingTeaAmount={post.brewingTeaAmount}
          brewingTime={post.brewingTime}
        />
      </ThumbnailContainer>
      <PostContainer>
      {post.post && documentToReactComponents(post.post.json, options)}
      </PostContainer>
    </>
  )
}

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const fluid = useContentfulImage(
        node.data.target.fields.file["en-US"].url
      );
      return (
        <div style={{ width: '90%' }}>
          <Image 
            title={node.data.target.fields.title["en-US"]} 
            fluid={fluid} 
            imgStyle={{ objectFit: 'cover' }}
          />
        </div>
      );
    }
  }
}

export const query = graphql`
  query($slug: String!) {
    contentfulTeaReviewPost(slug: { eq: $slug }) {
        updatedAt(formatString: "DD.MM.YY")
        teaName
        teaSource
        rating
        teaType
        pricePerGram
        brewingWaterAmount
        brewingTime
        brewingTemp
        brewingTeaAmount
        thumbnail {
          fluid(maxWidth: 500) {
              ...GatsbyContentfulFluid
          }
        }
        post {
          json
        }
    }
  }
`