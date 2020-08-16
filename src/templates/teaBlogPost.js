import React from "react"
import { graphql } from "gatsby"

export default function BlogPost({ data }) {
  const post = data.contentfulTeaBlogPost

  return (
    <>
        <span>Hello world!</span>
    </>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulTeaBlogPost(slug: { eq: $slug }) {
        title
    }
  }
`