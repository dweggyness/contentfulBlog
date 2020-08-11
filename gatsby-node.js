const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allContentfulTeaReviewPost {
              edges {
                node {
                  slug
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulTeaReviewPost.edges
        const postsPerPage = 4
        const numPages = Math.ceil(posts.length / postsPerPage)

        // pagination for list of tea reviews
        Array.from({ length: numPages }).forEach((_, i) => {
          createPage({
            path: i === 0 ? `/tea-reviews` : `/tea-reviews/${i + 1}`,
            component: path.resolve("./src/templates/teaReviewList.js"),
            context: {
              limit: postsPerPage,
              skip: i * postsPerPage,
              numPages,
              currentPage: i + 1,
            },
          })
        })

        // page for each tea review
        posts.forEach((post, index) => {
          createPage({
            path: `/tea-reviews/${post.node.slug}/`,
            component: path.resolve('./src/templates/teaBlogPost.js'),
            context: {
              slug: post.node.slug
            },
          })
        })
      })
    )
  })
}