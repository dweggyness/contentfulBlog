import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import { Layout, TeaReviewBlogPost } from '../components';

const PostGridContainer = styled.section`
  display: grid;
  grid-template: repeat(auto-fill, minmax(300px, 1fr)) / repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 3em;
  width: 100%;
`

export default function TeaReviewList({ data }) {
  const posts = data.allContentfulTeaReviewPost.edges

  return (
    <Layout>
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
    </Layout>
  )
}

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allContentfulTeaReviewPost(
        sort: { fields: [updatedAt], order: DESC }
        limit: $limit
        skip: $skip
    ) {
        edges {
            node {
                updatedAt
                teaName
                teaSource
                rating
                teaType
                pricePerGram
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