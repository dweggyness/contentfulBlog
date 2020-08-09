import React from "react"
import { Link } from "gatsby" // highlight-line

export default function Home() {
  return (
    <div>
      <Link to="/about/">Contact</Link> {/* highlight-line */}
      <span>Hello world!</span>
      <span>{process.env.TEST_ENV_VAR}</span>
      <img src="https://source.unsplash.com/random/400x200" alt="" />
    </div>
  )
}
