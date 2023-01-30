import './App.css';
import Modal from './components/Modal.js';
import Backdrop from './components/Backdrop';
import {useEffect, useState} from 'react';
import Portfolio from './components/SegmentComponents/Portfolio';
import { useQuery } from "graphql-hooks";
import { Image } from 'react-datocms';
import Menu from '../src/components/Menu/Menu'
import { Helmet } from "react-helmet";
import MobileMenu from './components/Menu/MobileMenu';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

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
  allAboutmes {
    aboutme {
      filename
      customData
      responsiveImage {
        src
        height
        width
      }
    }
  }
}`;

function App() {

  //Language settings
  useEffect(() => {
    setAllLanguage()
  });

  const setAllLanguage = () => {
    let elements = document.querySelectorAll('[language]');

    elements.forEach(setLanguage);
    function setLanguage(value) {
      if (value.getAttribute('language') !== localStorage.getItem("language")){
        value.style.display = "none";
      } else {
        value.style.display = "block";
      }
    }
  }

  //mobile menu
  const closeMenuBar = () => {
    document.getElementById("sidenav").style.transition = "1s";
    document.getElementById("sidenav").style.left = "-17rem";
  }

  const openMenuBar = () =>{
    document.getElementById("sidenav").style.transition = "1s";
    document.getElementById("sidenav").style.left = "0";
  }

  var portfolioCaret = document.getElementById("portfolio-dropdown-caret");
  var portfolioButtonTitle = document.getElementById("portfolio-dropdown-title");
  var portfolioButton = document.getElementById("portfolio-dropdown");
  var menuIcon = document.getElementById("menu-icon");
  var menuButton = document.getElementById("menu-title-id");
  var slideBar = document.getElementById("sidenav");
  var menuButtonLine = document.getElementById("menu-button-line");

  // window.onclick = function(event) {
  //   if (event.target != slideBar
  //     && event.target != menuButton
  //     && event.target != menuIcon
  //     && event.target != menuButtonLine
  //     && event.target != portfolioButton
  //     && event.target != portfolioButtonTitle
  //     && event.target != portfolioCaret) {
  //     closeMenuBar();
  //   }
  // }

  //modal handling
  // const [ModalIsOpen, setModalIsOpen] = useState((localStorage.getItem("language") == null) ? true : false);

  // const closeModalHandler = () => {
  //   setModalIsOpen(false)
  //   setAllLanguage()
  // }

  //CMS
  const { loading, error, data } = useQuery(HOMEPAGE_QUERY, {
    variables: {
      limit: 10
    }
  });
  if (loading) return ""; //return "Loading..."
  if (error) return "Something Bad Happened";
  //CMS

  //collecting portfolio titles for menu
  let engPortfolioTitles = data.allPortfolios[0].portfolio
                          .sort((a, b) => a.customData.custom_order - b.customData.custom_order)
                          .map(portfolioTitles =>(portfolioTitles.title))
  let hunPortfolioTitles = data.allPortfolios[0].portfolio
                          .sort((a, b) => a.customData.custom_order - b.customData.custom_order)
                          .map(portfolioTitles =>(portfolioTitles.customData.hungarian))

  let portfolioTitles = []
  for(let i = 0; i < engPortfolioTitles.length; i++){
    portfolioTitles.push([engPortfolioTitles[i], hunPortfolioTitles[i]])
  }

  //initialize languge
  if (localStorage.getItem("language") == null){
    localStorage.setItem("language", "hungarian");
  }

  //page rendering
  return (
    <motion.div
      className="pagewidth"
      style={AppStyles.pagewidth}
      initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0, transition: {duration: 0.9}}}

    >

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

      {/* { ModalIsOpen ? <Modal onChoose={closeModalHandler}/> : null}
      { ModalIsOpen ? <Backdrop /> : null} */}

      <Menu menuList={portfolioTitles} switchLang={setAllLanguage}/>
      <MobileMenu menuList={portfolioTitles} switchLang={setAllLanguage} openMenuBar={openMenuBar} closeMenuBar={closeMenuBar}/>
      {/* <a id="home" ></a> */}
      <div class= "fixed-menu-spacer" id="home"></div>

      <div className="mainBackground">
        <Image data={data.allBackgrounds[0].mainBackground.responsiveImage} />
        <div className="canvas" style={AppStyles.canvas}>
          <div className="nametitle" style={AppStyles.nametitle}>
            <div className="artistname" style={AppStyles.artistname}><h1 className="artistnameheader" style={AppStyles.artistnameheader}>Stella Novak</h1></div>
            <div className="artistjob" style={AppStyles.artistjob}><h2 className="artistjobheader" style={AppStyles.artistjobheader}>PHOTOGRAPHER</h2></div>
          </div>

        </div>
      </div>
      <a id="aboutme" ></a>

      <div class="about-container">
        <div class="about-text">
          <h1 language="english" class="about-me">About me </h1>
          <h1 language="hungarian" class="about-me">Rólam </h1>

          <article>
          <p>
            <p language="english" class="about-line">heeeyooooo</p>
            <p language="hungarian" class="about-line">haliho</p>
            <br></br>
            <p language="english" class="about-line">I have worked as a photographer for almost 6 years, it's my passion as well as my job. I love catching moments and making them last forever in my pictures.</p>
            <p language="hungarian" class="about-line">{data.allAboutmes[0].aboutme.customData.aboutmetext}</p>
            <br></br>
          </p>
          </article>
        </div>
        <div class="about-picture">
          <Image data={data.allAboutmes[0].aboutme.responsiveImage} />
        </div>
      </div>

      <a id="portfolio" ></a>
      <Portfolio setAllLanguage={setAllLanguage}/>
      <a id="services" ></a>
      <a id="contact" ></a>
      <section>
        <div class="contact-container">
          <div class="contact-text">
            <h1 language="english" class="contact-header"> Contact </h1>
            <h1 language="hungarian" class="contact-header"> Kapcsolat </h1>


            <div id="contact-info">
              <div className='contact-part'>
                <FontAwesomeIcon icon={faLocationDot} className="fa-icon"/>
                  <div className='location-lines'>
                    <p> Stella Novak </p>
                    <p> Photographer </p>
                    <p> based in Budapest </p>
                  </div>
              </div>

              <div className='contact-part'>
                <FontAwesomeIcon icon={faPhone} className="fa-icon"/>
                <p> Phone: 123-456-78901 </p>
              </div>

              <div className='contact-part'>
                <FontAwesomeIcon icon={faEnvelope} className="fa-icon"/>
                <p> Email: info@stellanovak.com </p>
              </div>

              <div className='contact-part'>
              <FontAwesomeIcon icon={faInstagram} className="fa-icon"/>
                <p> Instagram: info@stellanovak.com </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="impressum" style={AppStyles.impressum}>
        @By Cs Marton, 2022
      </div>
    </motion.div>
  );
}

const AppStyles = {
    pagewidth: {
      maxWidth: "120rem",
      margin: "0 auto"
    },

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
      position: "bottom",
      color: "white",
      bottom: "0",
      left: "0",
      fontSize: "8px"
    }
};

export default App;
