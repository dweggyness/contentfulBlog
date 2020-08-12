import React from "react"
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <span>Hello world!</span>
      <span>{process.env.TEST_ENV_VAR}</span>
      <img src="https://source.unsplash.com/random/400x200" alt="" />
    </Layout>
  )
}
