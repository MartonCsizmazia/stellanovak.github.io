import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GraphQLClient, ClientContext } from 'graphql-hooks'
import {BrowserRouter} from 'react-router-dom';
import { Link, Routes, Route} from 'react-router-dom';
import PortfolioSubPage from './pages/PortfolioSubPage';
import Urlcollector from './components/Urlcollector';



const client = new GraphQLClient({
    url: "https://graphql.datocms.com/",
    headers: {
      "Authorization": "Bearer 6933d92393fa532e110d10060052bf",
    }
  });

const root = ReactDOM.createRoot(document.getElementById('root'));
const list = []
root.render(

    <ClientContext.Provider value={client}>
        <Urlcollector/>
        <BrowserRouter>
            <Routes>
            {list.map(portfolio => (
                <Route exact path={"/" + portfolio} element={<PortfolioSubPage/>}/>
            ))}
                <Route exact path='/' element={<App/>}/>
                <Route exact path='/portraits' element={<PortfolioSubPage/>}/>
            </Routes>
        </BrowserRouter>
    </ClientContext.Provider>
);
