import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import { TeaReviewBlogPost } from '../components';

const PostGridContainer = styled.section`
  display: grid;
  grid-template: repeat(auto-fill, minmax(300px, 1fr)) / repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 3em;
  width: 100%;
`

export default function TeaReviewList({ pageContext, data }) {
  const posts = data.default.edges
  console.log(pageContext)

  return (
    <>
      <PostGridContainer>
        {posts.map(post => 
          <TeaReviewBlogPost 
            thumbnail={post.node.thumbnail}
            title={`${post.node.teaSource} ${post.node.teaName}`} 
            slug={post.node.slug}
            teaType={post.node.teaType}
            teaPrice={post.node.pricePerGram}
            teaRating={post.node.rating}
          />
        )}
      </PostGridContainer>
    </>
  )
}

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    default: allContentfulTeaReviewPost(
        sort: { fields: [updatedAt], order: DESC }
        limit: $limit
        skip: $skip
    ) {
        edges {
          node {
            ...PostData
          }
        }
    }
    allPosts: allContentfulTeaReviewPost(
        sort: { fields: [updatedAt], order: ASC }
        limit: $limit
        skip: $skip
    ) {
        edges {
          node {
            ...PostData
          }
        }
    }
  }
`

