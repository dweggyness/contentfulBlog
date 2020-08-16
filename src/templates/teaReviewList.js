import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import { TeaReviewPost, TeaSortComponent, TeaFilterComponent, Pagination } from '../components';
import bgImageLight from '../../static/seigaihaLight.png'
import bgImageDark from '../../static/seigaihaDark.png'

const SortFilterContainer = styled.section`
  width: 60%;
  max-width: 600px;

  margin: 0 20%;
  display: flex;
  flex-direction: row;

  background-color: ${props => props.theme.modalColor};
  border-top: ${props => (`2px solid ${props.theme.secondaryColor}`)};
  filter: drop-shadow(0 1px 1px #999);

  @media (max-width: 768px) {
    width: 80%;
    margin: 0 10%;
  }
`


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
  margin: -50px 0 -100px;
`

const PostGridContainer = styled.main`
  display: grid;
  grid-template: repeat(auto-fill, minmax(200px, 300px)) / repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 3em;
  width: 80%;

  margin: 0 10%;
`

export default function TeaReviewList({ location: { state }, pageContext, data }) {
  const [sortOption, setSortOption] = useState(state ? state.sortOption : 'latest');
  const [posts, setPosts] = useState(data.descDate.edges);
  const [navProps, setNavProps] = useState({});
  const currentFilter = pageContext.filter.length === 1 ? pageContext.filter[0] : null;

  useEffect(() => {
    if (sortOption) { 
      switch(sortOption) {
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
      setNavProps({ sortOption })
    }
  }, [data, sortOption])

  return (
    <>
      <SortFilterContainer>
        <TeaFilterComponent 
          value={currentFilter} 
          navProps={navProps}
        />
        <TeaSortComponent 
          setSortOption={setSortOption} 
          value={sortOption}
        />
      </SortFilterContainer>
      <BackgroundDivider />
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
        navProps={navProps}
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

