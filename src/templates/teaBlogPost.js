import React from "react"
import Layout from '../components/Layout';
import { graphql } from "gatsby" // highlight-line

// highlight-start
export default function BlogPost({ data }) {
  const post = data.contentfulTeaReviewPost
  // highlight-end
  return (
    <Layout>
        <span>Hello world!</span>
        <p>{`Tea: ${post.teaName} from ${post.teaSource}`}</p>
        <p>{`A ${post.teaType} that costs RM${post.pricePerGram}/g, and I rate it ${post.rating} stars`}</p>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulTeaReviewPost(slug: { eq: $slug }) {
        teaName
        teaSource
        rating
        teaType
        pricePerGram
    }
  }
`