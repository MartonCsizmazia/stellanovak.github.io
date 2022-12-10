import './styles/portfolio.css';
import { useQuery } from "graphql-hooks";
import { Image } from 'react-datocms';
import { Link } from 'react-router-dom';
import {useEffect} from 'react';

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

// Dynamic query creator:
HOMEPAGE_QUERY =  HOMEPAGE_QUERY.slice(0, HOMEPAGE_QUERY.length-2)
                  + `allPortraits {
                      portrait {
                        title
                      }
                    }`
                  + HOMEPAGE_QUERY.slice(-2);

const Portfolio = (props) => {
  useEffect(() => {
    props.setAllLanguage()
  });

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
    <div style={PortfolioStyles.portfolio} className="portfolio">
      <div className="card-holder">
        {data.allPortfolios[0].portfolio
          .sort((a, b) => a.customData.custom_order - b.customData.custom_order)
          .map(picture => (
            <div key={picture.title}>
              <Link to={"/"+ picture.title}>
                <div className="grid-item">
                  <div className="imagecontainer">
                    <Image className="image" data={picture.responsiveImage} />
                  </div>
                  <div className="middle">
                    <div language="hungarian" className="text">{picture.customData.hungarian}</div>
                    <div language="english" className="text">{picture.title}</div>
                  </div>
                </div>
              </Link>
            </div>
        ))}
      </div>
    </div>
  )
}

const PortfolioStyles = {
  portfolio: {
    marginTop: "10rem"
  }
};

export default Portfolio;
