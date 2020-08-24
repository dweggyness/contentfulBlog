import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import { TeaBlogPost, Pagination } from '../components';
import bgImageLight from '../../static/seigaihaLight.png'
import bgImageDark from '../../static/seigaihaDark.png'

const BackgroundDivider = styled.div`
  background-image: ${props => (props.theme.curTheme === 'light' 
    ? `url(${bgImageLight})` 
    : `url(${bgImageDark})`
  )};
  background-repeat: repeat-x;

  z-index: -1;
  opacity: ${props => (props.theme.curTheme === 'light' ? 0.6 : 0.3)};
  height: 200px;
  width: 100%;
  margin: 0 0 -100px;
`

const PostGridContainer = styled.main`
  display: grid;
  grid-template: repeat(auto-fill, minmax(250px, 300px)) / repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: minmax(250px, 300px);
  grid-gap: 3em;
  width: 80%;

  margin: 0 10%;
`

export default function TeaBlogList({ pageContext, data }) {
  const posts = data.allContentfulTeaBlogPost.edges

  return (
    <>
      <BackgroundDivider />
      <PostGridContainer>
        {posts.map((post, i) => 
          <TeaBlogPost
            title={post.node.title}
            thumbnail={post.node.thumbnail}
            slug={post.node.slug}
            postCreationDate={post.node.updatedAt}

            key={i}
          />
        )}
      </PostGridContainer>
      <Pagination 
        style={{ margin: '30px 0' }} 
        currentPage={pageContext.currentPage} 
        numberOfPages={pageContext.numPages}
      />
    </>
  )
}

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allContentfulTeaBlogPost(
        sort: { fields: [updatedAt], order: DESC }
        limit: $limit
        skip: $skip
    ) {
        edges {
          node {
            updatedAt(formatString: "DD.MM.YY")
            title
            slug
            thumbnail {
                fluid(maxWidth: 500) {
                ...GatsbyContentfulFluid
                }
            }
          }
        }
    }
  }
`

