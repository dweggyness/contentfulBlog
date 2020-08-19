import React, { useContext } from "react"
import { graphql } from "gatsby"
import styled, { ThemeContext } from "styled-components";
import Image from "gatsby-image"
import { TeaReviewPostDetails } from '../components';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import useContentfulImage from '../utils/useContentfulImage';

const PostContainer = styled.main`
  max-width: 730px;
  margin: 0 24px;
  padding: 24px 0;
  font-size: 18px;
  line-height: 25px;
  letter-spacing: 0.3px;
  font-weight: 300;
  display: flex;
  flex-direction: column;

  p {
    margin: 12px;
  }
`

const ThumbnailContainer = styled.section`
  max-width: 400px;
  width: 100%;
  margin: 0 24px;
`

const ImageDescription = styled.div`
  border-top: ${props => (`1px solid ${props.theme.textColor}`)};
  margin: 0 5px;
  padding: 3px 12px;
  
  font-family: 'Raleway';
  font-weight: 500;
  font-size: 14px;
`

const BoldedText = styled.span`
  font-weight: 600;
  font-size: 24px;
`

export default function ReviewPost({ data }) {
  const theme = useContext( ThemeContext )
  const post = data.contentfulTeaReviewPost

  console.log(post.post.json);

  return (
    <>
      <ThumbnailContainer>
        <Image 
          fluid={post.thumbnail.fluid}
          style={{ maxHeight: 400, height: '100%' }}
          imgStyle={{ objectFit: 'contain' }}
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
  renderMark: {
    [MARKS.BOLD]: text => <BoldedText>{text}</BoldedText>,
  },
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const fluid = useContentfulImage(
        node.data.target.fields.file["en-US"].url
      );
      const description = node.data.target.fields.description["en-US"];

      return (
        <div style={{ width: '85%' }}>
          <Image 
            title={node.data.target.fields.title["en-US"]} 
            fluid={fluid} 
            style={{ height: '100%', maxHeight: 350 }}
            imgStyle={{ objectFit: 'contain' }}
          />
          <ImageDescription>
            {description}
          </ImageDescription>
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