import React, { useContext } from "react"
import { graphql, Link } from "gatsby"
import { Helmet } from "react-helmet"
import styled, { ThemeContext } from "styled-components";
import Image from "gatsby-image"
import { TeaReviewPostDetails } from '../components';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import useContentfulImage from '../utils/useContentfulImage';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

const PostContainer = styled.main`
  max-width: 730px;
  margin: 0 24px;
  padding: 24px 0;
  font-size: 18px;
  line-height: 25px;
  letter-spacing: 0.2px;
  font-weight: 300;
  display: flex;
  flex-direction: column;

  p {
    margin: 12px 0;
  }
`

const ContinuedReadingContainer = styled.section`
  display: flex;
  justify-content: space-between;
  max-width: 730px;
  width: 100%;
  margin: 24px 0;
  border-top: ${props => `1px solid ${props.theme.textColor}`};

  justify-content: space-between;
`

const NextPostContainer = styled(Link)`
  color: ${props => props.theme.textColor};
  text-decoration: none;
  
  display: flex;
  align-items: center;

  &:hover, &:focus {
    color: ${props => props.theme.primaryColor};
  }
`

const NextPostPreview = styled.div`
  max-width: 200px;
  padding: 24px 0;
  width: 100%;
  text-align: center;
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

const AnchorTag = styled.a`
  color: ${props => props.theme.highlightColor};

  &:hover {
    color: ${props => props.theme.primaryColor};
  }
`

export default function ReviewPost({ data, pageContext }) {
  const theme = useContext( ThemeContext )
  const post = data.contentfulTeaReviewPost

  return (
    <>
      <Helmet>
          <meta charSet="utf-8" />
          <title>{post.teaName}</title>
      </Helmet>
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
          teaPrice={post.price}
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
      <ContinuedReadingContainer>
          {data.prev
          ? <NextPostContainer to={`/tea-reviews/${data.prev.slug}`}>
              <MdKeyboardArrowLeft size={48} style={{ marginRight: 10 }} />
              <NextPostPreview>
              <Image 
                fluid={data.prev.thumbnail.fluid}
                style={{ marginBottom: 10, maxHeight: 200, height: '100%' }}
                imgStyle={{ objectFit: 'contain' }}
              />
              {`${data.prev.teaSource} ${data.prev.teaName}`}
              </NextPostPreview>
            </NextPostContainer>
          : <div /> }
          {data.next
          ? <NextPostContainer to={`/tea-reviews/${data.next.slug}`}>
              <NextPostPreview>
              <Image 
                fluid={data.next.thumbnail.fluid}
                style={{ marginBottom: 10, maxHeight: 200, height: '100%' }}
                imgStyle={{ objectFit: 'contain' }}
              />
              {`${data.next.teaSource} ${data.next.teaName}`}
              </NextPostPreview>
              <MdKeyboardArrowRight size={48} style={{ marginLeft: 10 }} />
            </NextPostContainer>
          : <div /> }
      </ContinuedReadingContainer>
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
        <div style={{ alignSelf: 'center', width: '85%' }}>
          <Image 
            title={node.data.target.fields.title["en-US"]} 
            fluid={fluid} 
            style={{  height: '100%', maxHeight: 350 }}
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
  query($slug: String!, $prevSlug: String, $nextSlug: String) {
    contentfulTeaReviewPost(slug: { eq: $slug }) {
        updatedAt(formatString: "DD.MM.YY")
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
        fluid(maxWidth: 500) {
            ...GatsbyContentfulFluid
        }
      }
    }
  }
`