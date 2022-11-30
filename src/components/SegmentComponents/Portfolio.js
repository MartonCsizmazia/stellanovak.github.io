
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
      <div className="">
        {data.allPortfolios[0].portfolioPictures
          .sort((a, b) => a.customData.custom_order - b.customData.custom_order)
          .map(picture => (
            <article>
              <Image data={picture.responsiveImage} />
              <h6>{picture.customData.custom_order}</h6>
            </article>
        ))}
        {/* {JSON.stringify(data)} */}
      </div>
      <img src={props.url} alt="Flowers in Chania"></img>
    </div>
  )
}


const PortolioStyles = {

};

export default Portfolio;
