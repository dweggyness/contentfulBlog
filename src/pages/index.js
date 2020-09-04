import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import { TeaBlogPost, TeaReviewPost } from '../components';
import { FaLeaf } from 'react-icons/fa';

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;

  padding: 0 10%;
`

const Title = styled.h1`
  font-size: 1.8em;
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

const LatestPostsTitle = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  font-size: 1.8em;
  font-weight: 600;

  margin: 30px 0 0;
`

const Description = styled.div`
  padding: 0;
  font-size: 1em;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: 0.2px;
  max-width: 730px;
`

const PostGridContainer = styled.main`
  display: grid;
  align-self: center;
  grid-template: repeat(auto-fill, minmax(250px, 350px)) / repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: minmax(250px, 350px);
  grid-gap: 3em;
  width: 70%;

  margin: 60px 20px;

  @media (max-width: 768px) {
    width: auto;
  }
`

export default function Home({ data }) {
  let posts = [...data.blog.edges, ...data.review.edges];

  posts.sort((a,b) => {
    const aDate = new Date(a.node.createdAt);
    const bDate = new Date(b.node.createdAt);
    if (aDate.getTime() < bDate.getTime()) return 1;
    else return -1;
  });

  if (posts.length > 4) {
    posts = posts.slice(0, 4);
  }

  return (
    <>
      <InfoContainer>
        <Title>
          jun's teahouse
        </Title>
        <Description>
          <p>Welcome! I'm Jun, and dwegstea is a blog where I document my experience as a beginner foraying
            into the world of tea. I appraise teas according to my personal opinion, log my brewing parameters, 
            and sometimes write about tea-related mishaps.
           </p>
          
          <p>{`This blog serves as my tea journal. Of course, a pen and paper would be functionally similar, but
            its cool to have your own website :)` } </p>
        </Description>
        <LatestPostsTitle>
          <FaLeaf style={{ marginRight: 10 }} size={26} />
          <span>Latest Posts</span>
        </LatestPostsTitle>
        <PostGridContainer>
          {posts.map((post, i) => 
            post.node.teaName 
            ? <TeaReviewPost 
                thumbnail={post.node.thumbnail}
                title={`${post.node.teaSource} ${post.node.teaName}`} 
                slug={post.node.slug}
                teaType={post.node.teaType}
                teaRating={post.node.rating}
                postCreationDate={post.node.updatedAt}
  
                key={i}
              />
            : <TeaBlogPost
              title={post.node.title}
              thumbnail={post.node.thumbnail}
              slug={post.node.slug}
              postCreationDate={post.node.updatedAt}

              key={i}
            />
          )}
        </PostGridContainer>
      </InfoContainer>
    </>
  )
}

export const query = graphql`
  query { 
    blog: allContentfulTeaBlogPost( limit: 4 ) {
      edges {
        node {
          ...BlogPreview
        }
      }
    }
    review: allContentfulTeaReviewPost( limit: 4 ) {
      edges {
        node {
          ...PostData
        }
      }
    }
  }
`