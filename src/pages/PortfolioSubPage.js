import { useQuery } from "graphql-hooks";
import { Image } from 'react-datocms';

let HOMEPAGE_QUERY = `query HomePage($limit: IntType) {
  allPortraits(first: $limit) {
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

  return (
    <div>
      {data.allPortraits[0].portrait
        .map(picture => (
          <div key={picture.title}>
              <Image className="image" data={picture.responsiveImage} />
          </div>
      ))}
    </div>
  )
}

export default PortfolioSubPage;
