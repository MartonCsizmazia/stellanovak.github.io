import './styles/portfolio.css';
import { useQuery } from "graphql-hooks";
import { Image } from 'react-datocms';

let HOMEPAGE_QUERY = `query HomePage($limit: IntType) {
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

//Dynamic query creator:
HOMEPAGE_QUERY =  HOMEPAGE_QUERY.slice(0, HOMEPAGE_QUERY.length-2)
                  + `allPortraits {
                      portraits {
                        filename
                        title
                        responsiveImage {
                          src
                          width
                          height
                        }
                      }
                    }`
                  + HOMEPAGE_QUERY.slice(-2);
                  console.log(HOMEPAGE_QUERY)

// let txt1 = "marton"
// let lastTwo = txt1.slice(-2);
// var txt2 = txt1.slice(0, txt1.length-2) + "bar" + lastTwo;
// console.log(txt2)

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
                  <Image className="image" data={picture.responsiveImage} />
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

};

export default Portfolio;
