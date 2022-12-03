import { useQuery } from "graphql-hooks";

let HOMEPAGE_QUERY = `query HomePage($limit: IntType) {
  allPortfolios(first: $limit) {
    portfolio {
      filename
      title
      customData
      responsiveImage ( imgixParams: { fit: crop, w: 450, h: 600, auto: format }){
        src
        width
        height
        title
      }
    }
  }
}`;

const Urlcollector = (links) => {

  //CMS
  const { loading, error, data } = useQuery(HOMEPAGE_QUERY, {
    variables: {
      limit: 10
    }
  });
  if (loading) return "Loading...";
  if (error) return "Something Bad Happened";
  //CMS

  links = data.allPortfolios[0].portfolio
    .sort((a, b) => a.customData.custom_order - b.customData.custom_order)
    .map(picture => (
      picture.title
  ))

  console.log(links)

  return links
}

export default Urlcollector;
