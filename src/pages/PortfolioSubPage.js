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

var pluralize = require('pluralize')

const PortfolioSubPage = (props) => {
  let upperProps = props.title.toString().charAt(0).toUpperCase() + props.title.slice(1)

  let HOMEPAGE_QUERY = `query HomePage($limit: IntType) {
    all` + pluralize(upperProps.toString()) + `(first: $limit) {
      ` + props.title.toString() + `{
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
      {data['all' + pluralize(upperProps.toString())][0][props.title.toString()]
        .map(picture => (
          <div key={picture.title}>
              <Image className='image' data={picture.responsiveImage} />
          </div>
      ))}
    </div>
  )
}

export default PortfolioSubPage;
