import './App.css';
import Modal from './components/Modal.js';
import Backdrop from './components/Backdrop';
import {useState} from 'react';
import Portfolio from './components/SegmentComponents/Portfolio';
import { useQuery } from "graphql-hooks";
import { Image } from 'react-datocms';
import Menu from '../src/components/Menu/Menu'
import { Helmet } from "react-helmet";

const HOMEPAGE_QUERY = `query HomePage {
  allBackgrounds {
    mainBackground {
      filename
      responsiveImage {
        src
        height
        width
      }
    }
  }
  allPortfolios{
    portfolio {
      filename
      title
      customData
    }
  }
}`;

function App() {
  //const [ModalIsOpen, setModalIsOpen] = useState(false);
  const [ModalIsOpen, setModalIsOpen] = useState((localStorage.getItem("language") == null) ? true : false);

  const closeModalHandler = () => {
    setModalIsOpen(false)
  }

  //CMS
  const { loading, error, data } = useQuery(HOMEPAGE_QUERY, {
    variables: {
      limit: 10
    }
  });
  if (loading) return "Loading...";
  if (error) return "Something Bad Happened";
  //CMS

  let portfolioTitles = data.allPortfolios[0].portfolio
                          .sort((a, b) => a.customData.custom_order - b.customData.custom_order)
                          .map(portfolioTitles =>(portfolioTitles.title))

  return (
    <div className='main-page'>

      <Helmet>
        <title>Novák Eszter Photography</title>
        <link rel="icon" type="image/x-icon" href="https://cdn4.iconfinder.com/data/icons/basic-ui-vol-2-32-px/32/ui-photo-picture-camera-512.png"/>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <meta name="keywords" content="fotózás, Novák Eszter, profi fotós, profi képek, photography, stella novak, photoshoot, professional photographer"/>
        <meta name="author" content="stella novak"/>
        <meta name="description" content="Portfolio and introduction of professional photgrapher, Stella Novak"/>
        <meta name="og:type" content="website"/>
        <meta name="twitter:title" content="Stella Novak Photography"/>
        <meta name="twitter:description" content="Portfolio and introduction of professional photgrapher, Stella Novak"/>
        <meta name="twitter:image" content="about/20210312_151725_582-01-02.webp"/>
      </Helmet>
      { ModalIsOpen ? <Modal onChoose={closeModalHandler}/> : null}
      { ModalIsOpen ? <Backdrop /> : null}

      <Menu menuList={portfolioTitles}/>
      { console.log(portfolioTitles)}

      {/* {console.log(data.allBackgrounds[0].mainBackground)} */}
      <div className="mainBackground">
        <Image data={data.allBackgrounds[0].mainBackground.responsiveImage} />
        <div className="canvas" style={AppStyles.canvas}>
          <div className="nametitle" style={AppStyles.nametitle}>
            <div className="artistname" style={AppStyles.artistname}><h1 className="artistnameheader" style={AppStyles.artistnameheader}>Stella Novak</h1></div>
            <div className="artistjob" style={AppStyles.artistjob}><h2 className="artistjobheader" style={AppStyles.artistjobheader}>PHOTOGRAPHER</h2></div>
          </div>
          <div className="impressum" style={AppStyles.impressum}>
            @By Cs Marton, 2022
          </div>
        </div>
      </div>

      <Portfolio/>
    </div>
  );
}

const AppStyles = {
    canvas: {
      display: "block",
      width: "100%",
      height: "100%"
    },
    kidswedding: {
      width: "100vw" ,
      height: "100%"
    },
    artistjob: {
      marginLeft: "0.2rem"
    },
    artistnameheader: {
      marginBlockStart: "0",
      marginBlockEnd: "0",
      fontSize: "5.5vw",
      lineHeight: "5.2vw"
    },
    artistjobheader: {
      marginBlockStart: "0",
      marginBlockEnd: "0",
      fontSize: "2.2vw",
      lineHeight: "3.5vw",
      letterSpacing: "1.1vw"
    },
    nametitle: {
      position: "absolute",
      top: "24vw",
      right: "8vw",
      color: "white"
    },
    impressum: {
      position: "fixed",
      color: "white",
      bottom: "0",
      left: "0",
      fontSize: "8px"
    }
};

export default App;
