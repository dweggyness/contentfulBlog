import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import { Layout, StarRating } from '../components';
import { Link } from "gatsby" // highlight-line
import colors from "../constants/colors";

const PostGridContainer = styled.section`
  display: grid;
  grid-template: repeat(auto-fill, minmax(300px, 1fr)) / repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 1em;
  width: 100%;
`

const PostContainer = styled.article`
  display: grid;
  grid-template-columns: 0.5fr 3fr 0.5fr;
  grid-template-rows: 2.5fr minmax(0.1fr, auto) 125px;
`

const PostImage = styled(Link)`
  grid-area: 1 / 1 / 3 / 4;
`

const PostTitle = styled.h3`
  grid-area: 2 / 2 / 3 / 3;
  display: grid;
  z-Index: 2;

  position: relative;
  margin: 0;
  font-weight: 400;
  font-size: 18px;
  background-color: rgba(255, 255, 255, 0.85);
  padding: 20px 25px 15px;
  pointer-events: none;
`

const PostLabel = styled.h4`
  font-family: 'Raleway';
  font-size: 12px;
  font-weight: 500;
  color: white;

  display: block;
  position: absolute;
  top: -10px;
  left: 25px;
  margin: 0;
  padding: 4px 10px;
  background-color: ${colors.darkgreen};
`

const PostDetailsContainer = styled.div`
  grid-area: 3 / 2 / 4 / 3;
  display: grid;
  grid-template: 1fr / repeat(3, auto);
  
  border-top: 1px solid ${colors.darkgreen};
  margin: 0 5px;
`

const PostDetail = styled.div`
  display: grid;
  align-items: center;
  border-left: 1px solid ${colors.darkgreen};
  border-collapse: collapse;
  padding: 3px 6px;
`

const DetailTitle = styled.p`
  font-family: 'Raleway';
  font-weight: 300;
  font-size: 12px;
  margin: 0;
`

const DetailContent = styled(DetailTitle)`
  font-weight: 600;
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
                <PostLabel>REVIEW</PostLabel> 
                {`${post.node.teaSource} ${post.node.teaName}`}
              </PostTitle>
              <PostDetailsContainer>
                <PostDetail style={{ borderLeft: 'none' }}>
                  <DetailTitle>Type</DetailTitle>
                  <DetailContent>
                    {post.node.teaType}
                  </DetailContent>
                </PostDetail>
                <PostDetail>
                  <DetailTitle>Price</DetailTitle>
                  <DetailContent>
                    {`RM${post.node.pricePerGram.toFixed(2)} / g`}
                  </DetailContent>
                </PostDetail>
                <PostDetail>
                  <DetailTitle>Rating</DetailTitle>
                  <DetailContent>
                    <StarRating rating={post.node.rating} />
                  </DetailContent>
                </PostDetail>
              </PostDetailsContainer>
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