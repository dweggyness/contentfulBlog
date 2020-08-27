import React from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"
import styled from "styled-components";
import Image from "gatsby-image"
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
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
    contentfulTeaBlogPost(slug: { eq: $slug }) {
        title
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