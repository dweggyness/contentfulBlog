import React from "react"
import { graphql } from "gatsby" // highlight-line

// highlight-start
export default function BlogPost({ data }) {
  const post = data.contentfulTeaReviewPost
  // highlight-end
  return (
    <>
        <span>Hello world!</span>
        <p>{`Tea: ${post.teaName} from ${post.teaSource}`}</p>
        <p>{`A ${post.teaType} that costs RM${post.pricePerGram}/g, and I rate it ${post.rating} stars`}</p>
    </>
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