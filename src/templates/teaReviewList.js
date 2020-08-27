import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import queryString from 'query-string';
import { TeaReviewPost, TeaSortComponent, TeaFilterComponent, SeigahaBackground, Pagination } from '../components';

const SortFilterContainer = styled.section`
  width: 60%;
  max-width: 600px;

  margin: 0 20%;
  display: flex;
  flex-direction: row;

  background-color: ${props => props.theme.modalColor};
  border-top: ${props => (`3px solid ${props.theme.primaryColor}`)};
  filter: drop-shadow(0 1px 1px #999);

  @media (max-width: 768px) {
    width: 80%;
    margin: 0 10%;
  }
`

const PostGridContainer = styled.main`
  display: grid;
  grid-template: repeat(auto-fill, minmax(250px, 300px)) / repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: minmax(250px, 300px);
  grid-gap: 3em;
  width: 80%;

  margin: 0 20px;

  @media (max-width: 768px) {
    width: auto;
  }
`

export default function TeaReviewList({ location: { pathname, search }, pageContext, data }) {
  const [sortBy, setSortBy] = useState(queryString.parse(search).sortBy ? queryString.parse(search).sortBy : '');
  const [posts, setPosts] = useState(data.descDate.edges);
  const [queryParams, setQueryParams] = useState({});
  const currentFilter = pageContext.filter.length === 1 ? pageContext.filter[0] : null;

  useEffect(() => {
    switch(sortBy) {
      case 'latest':
        setPosts(data.descDate.edges);
        break;
      case 'oldest':
        setPosts(data.ascDate.edges);
        break;
      case 'lowestRating':
        setPosts(data.lowestRating.edges);
        break;
      case 'highestRating':
        setPosts(data.highestRating.edges);
        break;
      default:
        setPosts(data.descDate.edges);
    }
    setQueryParams({ sortBy })
  }, [data, sortBy])

  return (
    <>
      <Helmet>
          <meta charSet="utf-8" />
          <meta name="description" content="A list of the tea reviews I have made."></meta>
          <title>Tea Reviews</title>
      </Helmet>
      <SortFilterContainer>
        <TeaFilterComponent 
          value={currentFilter} 
          queryParams={queryParams}
        />
        <TeaSortComponent 
          setSortBy={setSortBy}
          value={sortBy}
          currentPath={pathname}
        />
      </SortFilterContainer>
      <SeigahaBackground />
      <PostGridContainer>
        {posts.map((post, i) => 
          <TeaReviewPost 
            thumbnail={post.node.thumbnail}
            title={`${post.node.teaSource} ${post.node.teaName}`} 
            slug={post.node.slug}
            teaType={post.node.teaType}
            teaRating={post.node.rating}
            postCreationDate={post.node.updatedAt}

            key={i}
          />
        )}
      </PostGridContainer>
      <Pagination 
        style={{ margin: '30px 0' }} 
        currentPage={pageContext.currentPage} 
        numberOfPages={pageContext.numPages} 
        navProps={queryParams}
      />
    </>
  )
}

export const query = graphql`
  query($skip: Int!, $limit: Int!, $filter: [String!]) {
    descDate: allContentfulTeaReviewPost(
        sort: { fields: [updatedAt], order: DESC }
        limit: $limit
        filter: { teaType: { in: $filter } }
        skip: $skip
    ) {
        edges {
          node {
            ...PostData
          }
        }
    }
    ascDate: allContentfulTeaReviewPost(
        sort: { fields: [updatedAt], order: ASC }
        limit: $limit
        filter: { teaType: { in: $filter } }
        skip: $skip
    ) {
        edges {
          node {
            ...PostData
          }
        }
    }
    lowestRating: allContentfulTeaReviewPost(
        sort: { fields: [rating], order: ASC }
        limit: $limit
        filter: { teaType: { in: $filter } }
        skip: $skip
    ) {
        edges {
          node {
            ...PostData
          }
        }
    }
    highestRating: allContentfulTeaReviewPost(
        sort: { fields: [rating], order: DESC }
        limit: $limit
        filter: { teaType: { in: $filter } }
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

