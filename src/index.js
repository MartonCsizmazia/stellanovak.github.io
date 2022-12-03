import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GraphQLClient, ClientContext } from 'graphql-hooks'
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import PortfolioSubPage from './pages/PortfolioSubPage';

const client = new GraphQLClient({
    url: "https://graphql.datocms.com/",
    headers: {
      "Authorization": "Bearer 6933d92393fa532e110d10060052bf",
    }
  });

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

    <ClientContext.Provider value={client}>
        {/* <Urlcollector/> */}
        <BrowserRouter>
            <Routes>
            {/* {list.map(portfolio => (
                <Route exact path={"/" + portfolio} element={<PortfolioSubPage/>}/>
            ))} */}
                <Route exact path='/' element={<App/>}/>
                {/* TITLE HAS TO BE SINGULAR in Route, and CMD*/}
                {/* PATH HAS TO BE THE SAME AS PICTURE.TITLE in portfolio pictures CMD*/}
                {/* Path connects to portfolo title in cmd, title connects to MODEL Id in cmd */}
                {/* key has to be unique, in order to re-mount the component with new homepage query data */}
                
                <Route exact path='/portraits' element={<PortfolioSubPage title="portrait" key="1"/>}/>
                <Route exact path='/weddings' element={<PortfolioSubPage title="wedding" key="2"/>}/>
                <Route exact path='/family' element={<PortfolioSubPage title="family" key="3"/>}/>
                <Route exact path='/animals' element={<PortfolioSubPage title="animal" key="4"/>}/>
                <Route exact path='/landscape' element={<PortfolioSubPage title="landscape" key="5"/>}/>
                <Route exact path='/sport' element={<PortfolioSubPage title="sport" key="6"/>}/>
            </Routes>
        </BrowserRouter>
    </ClientContext.Provider>
);
