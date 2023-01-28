import { useQuery } from "graphql-hooks";
import { Routes, Route, useLocation  } from 'react-router-dom';
import App from '../App';
import PortfolioSubPage from '../pages/PortfolioSubPage';
import Services from "../pages/Services";

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
  const location = useLocation();

  let pluralize = require('pluralize')

  //CMS
  const { loading, error, data } = useQuery(HOMEPAGE_QUERY, {
    variables: {
      limit: 10
    }
  });
  if (loading) return ""; //return "Loading..."
  if (error) return "Something Bad Happened";
  //CMS

  links = data.allPortfolios[0].portfolio
    .sort((a, b) => a.customData.custom_order - b.customData.custom_order)
    .map(picture => (
      //picture.title.replace(/\s+/g, '')
      picture.title
  ))
  console.log(links)
  return (
    <div>

    <Routes location={location} key={location.pathname}>
      <Route exact path='/' element={<App/>}/>
      <Route exact path='/portfolio' element={<App/>}/>
      {links.map((link, i) =>

        <Route exact path={link} element={<PortfolioSubPage title={pluralize.singular(link).toLowerCase()} key={i}/>}/>

      )}
      <Route exact path='/services' element={<Services/>}/>
    </Routes>

    </div>
  )
}

export default Urlcollector;
