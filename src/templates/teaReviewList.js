import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import { TeaReviewBlogPost, Pagination } from '../components';
import bgImageLight from '../../static/seigaihaLight.png'
import bgImageDark from '../../static/seigaihaDark.png'

const SectionContainer = styled.section`
  width: 80%;

  padding: 0 10%;
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  font-family: Raleway;
  margin: 0;
  position: relative;

  ::before {
    height: 15px;
    content: "Tea Reviews";
    color: transparent;
    position: absolute;
    top: 30px;
    left: -15px;
    z-Index: -1;

    background-color: ${props => props.theme.primaryColor};
  }
`

const Description = styled.p`
  padding: 0;
  font-size: 18px;
  line-height: 22px;
`

const SortFilterContainer = styled.div`
  display: flex;
  flex-direction: row;

  border: ${props => (`1px solid ${props.theme.textColor}`)};
`

const BackgroundDivider = styled.div`
  background-image: ${props => (props.theme.curTheme === 'light' 
    ? `url(${bgImageLight})` 
    : `url(${bgImageDark})`
  )};
  background-repeat: repeat-x;

  opacity: ${props => (props.theme.curTheme === 'light' ? 0.6 : 0.3)};
  height: 200px;
  width: 100%;
  margin-bottom: -100px;
`

const PostGridContainer = styled.main`
  display: grid;
  grid-template: repeat(auto-fill, minmax(200px, 300px)) / repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 3em;
  width: 80%;

  margin: 0 10%;
`

export default function TeaReviewList({ pageContext, data }) {
  const posts = data.default.edges

  return (
    <>
      <SectionContainer>
        <InfoContainer>
          <Title>
            Tea Reviews
          </Title>
          <Description>
            A catalog of the various teas I have tried, along with my opinions on them.
          </Description>
        </InfoContainer>
        <SortFilterContainer>

        </SortFilterContainer>
      </SectionContainer>
      <BackgroundDivider />
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
      <Pagination style={{ margin: '30px 0' }} currentPage={pageContext.currentPage} numberOfPages={pageContext.numPages} />
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

