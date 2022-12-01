import { useQuery } from "graphql-hooks";
import { Image } from 'react-datocms';

let HOMEPAGE_QUERY = `query HomePage() {
  allPortraits {
    portrait {
      filename
      title
      responsiveImage {
        src
        width
        height
        title
      }
    }
  }
}`;

const PortfolioSubPage = (props) => {

  //CMS
  const { loading, error, data } = useQuery(HOMEPAGE_QUERY, {
    variables: {
      limit: 10
    }
  });
  if (loading) return "Loading...";
  if (error) return "Something Bad Happened";
  //CMS

  return <div>Sub page for portfolio categories</div>
}

export default PortfolioSubPage
