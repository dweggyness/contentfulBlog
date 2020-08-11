import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import Layout from '../components/Layout';
import { Link } from "gatsby" // highlight-line

const PostGridContainer = styled.section`
  display: grid;
  grid-template: repeat(3, 1fr) / repeat(3, 1fr);
  grid-gap: 1em;
  width: 80%;
`

const PostContainer = styled.article`
  box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.2);
`

export default function Home({ data }) {
  const posts = data.allContentfulTeaReviewPost.edges
  console.log(posts);

  return (
    <Layout>
      <span>Tea review page or something</span>
      <PostGridContainer>
        {posts.map(post => 
            <PostContainer>
                <Img 
                    fluid={post.node.thumbnail.fluid} 
                    key={post.node.thumbnail.fluid.src}
                    alt={post.node.thumbnail.title}
                />
                <Link to={`/tea-reviews/${post.node.slug}`}>{`${post.node.teaSource} ${post.node.teaName}`}</Link>
            </PostContainer>
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