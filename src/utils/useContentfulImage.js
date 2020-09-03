import { graphql, useStaticQuery } from "gatsby";

export default assetUrl => {
  const { allContentfulAsset } = useStaticQuery(
    graphql`
      query CONTENTFUL_IMAGE_QUERY {
        allContentfulAsset {
          nodes {
            file {
              url
            }
            fluid(maxWidth: 750) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    `
  );
  if (assetUrl === undefined || assetUrl === null) return null;
  return allContentfulAsset.nodes.find(n => n.file.url === assetUrl).fluid;
};