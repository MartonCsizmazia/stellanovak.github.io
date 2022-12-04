import { useQuery } from "graphql-hooks";
import { HashRouter, BrowserRouter, Routes, Route, useLocation  } from 'react-router-dom';
import App from '../App';
import PortfolioSubPage from '../pages/PortfolioSubPage';
import reactRouterToArray from 'react-router-to-array';

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
  if (loading) return "Loading...";
  if (error) return "Something Bad Happened";
  //CMS

  links = data.allPortfolios[0].portfolio
    .sort((a, b) => a.customData.custom_order - b.customData.custom_order)
    .map(picture => (
      picture.title
  ))


  console.log(links)
  return (
    <div>

    <Routes location={location} key={location.pathname}>
      <Route exact path='/' element={<App/>}/>
      {links.map((link, i) =>
      <Route exact path={link} element={<PortfolioSubPage title={pluralize.singular(link).toLowerCase()} key={i}/>}/>
      )}
      {links.map((link, i) =>
      console.log(link, pluralize.singular(link), i)
      )}
    </Routes>
    </div>
  )
}

export default Urlcollector;
