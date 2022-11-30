import './styles/portfolio.css';
import { useQuery } from "graphql-hooks";
import { Image } from 'react-datocms';

const HOMEPAGE_QUERY = `query HomePage($limit: IntType) {
  allPortfolios( first: $limit) {
    portfolioPictures{
      filename
      title
      customData
      responsiveImage ( imgixParams: { fit: crop, w: 450, h: 600, auto: format }){
        src
        width
        height
      }
    }
  }
}`;


const Portfolio = (props) => {

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
    <div className="portfolio">
      <div className="card-holder">
        {data.allPortfolios[0].portfolioPictures
          .sort((a, b) => a.customData.custom_order - b.customData.custom_order)
          .map(picture => (
            <article>
              <div className="grid-item" onclick="location.href='/portraits';">
                <div className="imagecontainer">
                  <Image className="image" style={{
                                                  
                                                   }} data={picture.responsiveImage} />
                  </div>
                <div className="middle">
                  <div className="text">{picture.title}</div>
                </div>
              </div>
            </article>
        ))}
      </div>
    </div>
  )
}


const PortfolioStyles = {
  transition: {transition: "0.3s ease-in-out"}


};

export default Portfolio;
