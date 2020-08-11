import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import { Layout, StarRating } from '../components';
import { Link } from "gatsby" // highlight-line

const PostGridContainer = styled.section`
  display: grid;
  grid-template: repeat(auto-fill, minmax(300px, 1fr)) / repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 1em;
  width: 100%;
`

const PostContainer = styled.article`
  display: grid;
  grid-template-columns: 0.5fr 3fr 0.5fr;
  grid-template-rows: 2.5fr minmax(0.5fr, auto) 0.3fr;
`

const PostImage = styled(Link)`
  grid-area: 1 / 1 / 3 / 4;
`

const PostTitle = styled.div`
  grid-area: 2 / 2 / 3 / 3;
  display: grid;
  justify-items: center;
  align-items: center;
  z-Index: 2;

  font-weight: 400;
  font-size: 18px;
  background-color: rgba(255, 255, 255, 0.85);
  padding: 15px 25px;
`

const PostDetails = styled.div`
  grid-area: 3 / 2 / 4 / 3;
  display: grid;
  grid-template: repeat(3, auto) / 1fr;
  
  border-top: 1px solid #3a6139;
  margin: 0 5px;
`

export default function Home({ data }) {
  const posts = data.allContentfulTeaReviewPost.edges
  console.log(posts);

  return (
    <Layout>
      <PostGridContainer>
        {posts.map(post => 
            <PostContainer>
              <PostImage to={`/tea-reviews/${post.node.slug}`}>
                <Img
                  fluid={post.node.thumbnail.fluid} 
                  key={post.node.thumbnail.fluid.src}
                  alt={post.node.thumbnail.title}
                />
              </PostImage>
              <PostTitle>
                {`${post.node.teaSource} ${post.node.teaName}`}
              </PostTitle>
              <PostDetails>
                <StarRating rating={post.node.rating} />
              </PostDetails>
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