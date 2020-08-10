import React from "react"
import Layout from '../components/Layout';
import { Link } from "gatsby" // highlight-line

export default function Home({ data }) {
  const posts = data.allContentfulTeaReviewPost.edges
  console.log(data);

  return (
    <Layout>
      <span>Tea review page or something</span>
      <ol>
        {posts.map(post => 
            <li>
                <Link to={`/tea-reviews/${post.node.slug}`}>{`${post.node.teaSource} ${post.node.teaName}`}</Link>
            </li>
        )}
      </ol>
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
            }
        }
    }
  }
`