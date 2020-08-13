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

