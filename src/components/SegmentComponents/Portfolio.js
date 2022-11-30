
import { useQuery } from "graphql-hooks";
import { Image } from 'react-datocms';

const HOMEPAGE_QUERY = `query HomePage($limit: IntType) {
  allUploads(orderBy: filename_ASC, first: $limit) {
    url
    id
    filename

      responsiveImage( imgixParams: { fit: crop, w: 450, h: 600, auto: format }) {
        srcSet
        sizes
        src
        width
        height
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
        {data.allUploads.map(blogPost => (
          <article>
            <Image data={blogPost.responsiveImage} />
            <h6>{blogPost.title}</h6>
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
