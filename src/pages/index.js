import React from "react"
import Layout from '../components/Layout';
import { Link } from "gatsby" // highlight-line

export default function Home() {
  return (
    <Layout>
      <Link to="/tea-reviews/">Tea Reviews</Link> {/* highlight-line */}
      <span>Hello world!</span>
      <span>{process.env.TEST_ENV_VAR}</span>
      <img src="https://source.unsplash.com/random/400x200" alt="" />
    </Layout>
  )
}
