const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allContentfulTeaReviewPost {
              edges {
                node {
                  teaType
                  slug
                }
              }
            }
            allContentfulTeaBlogPost {
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
        
        // redirect
        createRedirect({ fromPath: 'tea-reviews/1', toPath: 'tea-reviews', isPermanent: true });

        const teaTypes = ['Black Tea', 'Green Tea', 'Oolong Tea', 'Pu-erh', 'White Tea']
        const teaFilterSlugs = ['black-tea','green-tea','oolong-tea','pu-erh','white-tea']

        const posts = result.data.allContentfulTeaReviewPost.edges
        const postsPerPage = 6
        const numPages = Math.ceil(posts.length / postsPerPage)

        // pagination for specific tea types
        for (let i = 0; i < 5; i++ ) {
          const curTeaType = teaTypes[i];
          const curSlug = teaFilterSlugs[i];

          const filteredPosts = posts.filter((e) => e.node.teaType === curTeaType);
          const numOfPages = Math.ceil(filteredPosts.length / postsPerPage);

          Array.from({ length: numOfPages }).forEach((_, i) => {
            createPage({
              path: i === 0 ? `/tea-reviews/${curSlug}` : `/tea-reviews/${curSlug}/${i + 1}`,
              component: path.resolve("./src/templates/teaReviewList.js"),
              context: {
                limit: postsPerPage,
                skip: i * postsPerPage,
                numPages: numOfPages,
                filter: [curTeaType],
                currentPage: i + 1,
              },
            })
          })
        }

        // pagination for list of all tea reviews
        Array.from({ length: numPages }).forEach((_, i) => {
          createPage({
            path: i === 0 ? `/tea-reviews` : `/tea-reviews/${i + 1}`,
            component: path.resolve("./src/templates/teaReviewList.js"),
            context: {
              limit: postsPerPage,
              skip: i * postsPerPage,
              filter: teaTypes,
              numPages,
              currentPage: i + 1,
            },
          })
        })

        // page for each tea review
        posts.forEach((post, index) => {
          createPage({
            path: `/tea-reviews/${post.node.slug}/`,
            component: path.resolve('./src/templates/teaReviewPost.js'),
            context: {
              slug: post.node.slug
            },
          })
        })

        const blogPosts = result.data.allContentfulTeaBlogPost.edges
        const numBlogPages = Math.ceil(blogPosts.length / postsPerPage)

        // page for each blog post
        blogPosts.forEach((post, index) => {
          createPage({
            path: `/blog/${post.node.slug}/`,
            component: path.resolve('./src/templates/teaBlogPost.js'),
            context: {
              slug: post.node.slug
            },
          })
        })

        // pagination for blog post
        Array.from({ length: numBlogPages }).forEach((_, i) => {
          createPage({
            path: i === 0 ? `/blog` : `/blog/${i + 1}`,
            component: path.resolve("./src/templates/teaBlogList.js"),
            context: {
              limit: postsPerPage,
              skip: i * postsPerPage,
              numPages: numBlogPages,
              currentPage: i + 1,
            },
          })
        })
      })
    )
  })
}