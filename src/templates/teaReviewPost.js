import React, { useContext } from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"
import styled, { ThemeContext } from "styled-components";
import Image from "gatsby-image"
import { TeaReviewPostDetails, ContinuedReading } from '../components';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import useContentfulImage from '../utils/useContentfulImage';

const PostContainer = styled.main`
  max-width: 730px;
  margin: 0 24px;
  padding: 24px 0;
  font-size: 0.9em;
  line-height: 27px;
  letter-spacing: 0.2px;
  font-weight: 300;
  display: flex;
  flex-direction: column;

  p {
    margin: 12px 0;
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
  font-size: 0.7em;
`

const BoldedText = styled.span`
  font-weight: 600;
  font-size: 1.2em;
`

const AnchorTag = styled.a`
  color: ${props => props.theme.highlightColor};

  &:hover {
    color: ${props => props.theme.primaryColor};
  }
`

export default function ReviewPost({ data }) {
  const theme = useContext( ThemeContext )
  const post = data.contentfulTeaReviewPost

  return (
    <>
      <Helmet>
          <meta charSet="utf-8" />
          <title>{`${post.teaSource} ${post.teaName}`}</title>
      </Helmet>
      <ThumbnailContainer>
        <Image 
          fluid={post.thumbnail.fluid}
          style={{ maxHeight: 400, height: '100%' }}
          imgStyle={{ objectFit: 'contain' }}
          alt={post.thumbnail.title}
        />
        <TeaReviewPostDetails 
          color={theme.textColor}
          bgColor={theme.modalColor}
          teaSource={post.teaSource}
          teaName={post.teaName}
          teaType={post.teaType}
          teaPrice={post.price}
          teaRating={post.rating}
          postCreationDate={post.createdAt}
          brewingWaterAmount={post.brewingWaterAmount}
          brewingTemp={post.brewingTemp}
          brewingTeaAmount={post.brewingTeaAmount}
          brewingTime={post.brewingTime}
        />
      </ThumbnailContainer>
      <PostContainer>
        {post.post && documentToReactComponents(post.post.json, options)}
      </PostContainer>
      <ContinuedReading 
        prev={data.prev}
        next={data.next}
      />
    </>
  )
}

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <BoldedText>{text}</BoldedText>,
  },
  renderNode: {
    [INLINES.HYPERLINK]: (node) => {
      return (
        <AnchorTag
          href={node.data.uri}
        >
          {node.content[0].value}
        </AnchorTag>
      )
    },
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const fluid = useContentfulImage(
        node.data.target.fields.file["en-US"].url
      );
      const description = node.data.target.fields.description["en-US"];

      return (
        <div style={{ alignSelf: 'center', margin: '24px 0', width: '85%' }}>
          <Image 
            title={node.data.target.fields.title["en-US"]} 
            fluid={fluid} 
            style={{  height: '100%', maxHeight: 350 }}
            imgStyle={{ objectFit: 'contain' }}
            alt={node.data.target.fields.title["en-US"]}
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
  query($slug: String!, $prevSlug: String, $nextSlug: String) {
    contentfulTeaReviewPost(slug: { eq: $slug }) {
        createdAt
        teaName
        teaSource
        rating
        teaType
        price
        brewingWaterAmount
        brewingTime
        brewingTemp
        brewingTeaAmount
        thumbnail {
          title
          fluid(maxWidth: 500) {
              ...GatsbyContentfulFluid
          }
        }
        post {
          json
        }
    }
    prev: contentfulTeaReviewPost(slug: { eq: $prevSlug }) {
      teaName
      teaSource
      slug
      thumbnail {
        title
        fluid(maxWidth: 500) {
            ...GatsbyContentfulFluid
        }
      }
    }
    next: contentfulTeaReviewPost(slug: { eq: $nextSlug }) {
      teaName
      teaSource
      slug
      thumbnail {
        title
        fluid(maxWidth: 500) {
            ...GatsbyContentfulFluid
        }
      }
    }
  }
`