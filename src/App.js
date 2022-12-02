import './App.css';
import Modal from './components/Modal.js';
import Backdrop from './components/Backdrop';
import {useState} from 'react';
import Portfolio from './components/SegmentComponents/Portfolio';
import { useQuery } from "graphql-hooks";
import { Image } from 'react-datocms';

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

  return (
    <div className='main-page'>
      { ModalIsOpen ? <Modal onChoose={closeModalHandler}/> : null}
      { ModalIsOpen ? <Backdrop /> : null}

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
      marginLeft: "0.5rem"
    },
    artistnameheader: {
      marginBlockStart: "0",
      marginBlockEnd: "0",
      fontSize: "5vw",
      lineHeight: "5.2vw"
    },
    artistjobheader: {
      marginBlockStart: "0",
      marginBlockEnd: "0",
      fontSize: "2.2vw",
      lineHeight: "2.3vw",
      letterSpacing: "0.8vw"
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
