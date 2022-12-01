import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GraphQLClient, ClientContext } from 'graphql-hooks'
import {BrowserRouter} from 'react-router-dom';
import { Routes, Route} from 'react-router-dom';
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
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<App/>}/>
                <Route exact path='/portrait' element={<PortfolioSubPage/>}/>
            </Routes>
        </BrowserRouter>
    </ClientContext.Provider>
);
