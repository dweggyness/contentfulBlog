import React from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"
import styled from "styled-components";
import Image from "gatsby-image"
import { ContinuedReading } from '../components';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import useContentfulImage from '../utils/useContentfulImage';

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
    margin: 12px;
  }
`

const ThumbnailContainer = styled.section`
  max-width: 400px;
  max-height: 350px;
  width: 100%;
  margin: 0 24px;
`

const ImageDescription = styled.div`
  border-top: ${props => (`1px solid ${props.theme.textColor}`)};
  margin: 0 5px;
  padding: 3px 12px;
  
  filter: brightness(70%);
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


export default function BlogPost({ data }) {
  const post = data.contentfulTeaBlogPost

  return (
    <>
      <Helmet>
          <meta charSet="utf-8" />
          <title>{post.title}</title>
      </Helmet>
      <ThumbnailContainer>
        <Image 
          fluid={post.thumbnail.fluid}
          style={{ height: '100%', maxHeight: 350 }}
          imgStyle={{ objectFit: 'cover' }}
          alt={post.thumbnail.title}
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
        <div style={{ alignSelf: 'center', width: '85%' }}>
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
    contentfulTeaBlogPost(slug: { eq: $slug }) {
        title
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
    prev: contentfulTeaBlogPost(slug: { eq: $prevSlug }) {
      title
      slug
      thumbnail {
        title
        fluid(maxWidth: 500) {
            ...GatsbyContentfulFluid
        }
      }
    }
    next: contentfulTeaBlogPost(slug: { eq: $nextSlug }) {
      title
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