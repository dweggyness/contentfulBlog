import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components";
import Image from "gatsby-image"
import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import useContentfulImage from '../utils/useContentfulImage';

const PostContainer = styled.main`
  max-width: 780px;
  margin: 0 24px;
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ThumbnailContainer = styled.section`
  max-width: 400px;
  width: 100%;
  margin: 0 24px;
`

export default function BlogPost({ data }) {
  const post = data.contentfulTeaBlogPost

  return (
    <>
      <ThumbnailContainer>
        <Image 
          fluid={post.thumbnail.fluid}
          style={{ maxHeight: 350 }}
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
            style={{ maxHeight: 350 }}
            imgStyle={{ objectFit: 'contain' }}
          />
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