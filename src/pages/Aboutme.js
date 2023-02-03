import Menu from "../components/Menu/Menu";
import MobileMenu from "../components/Menu/MobileMenu";
import { motion } from 'framer-motion';
import {useEffect} from 'react';
import { useQuery } from "graphql-hooks";
import { Image } from 'react-datocms';
import './aboutme.css';

const Aboutme = () => {

   //Language settings
   useEffect(() => {
    setAllLanguage()
  });

  let pluralize = require('pluralize')

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

  // let upperProps = props.title.toString().charAt(0).toUpperCase() + props.title.slice(1)

  let HOMEPAGE_QUERY = `query HomePage {
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

  //Handling mobile menu
  const closeMenuBar = () => {
    document.getElementById("sidenav").style.transition = "1s";
    document.getElementById("sidenav").style.left = "-17rem";
    console.log("CLOSE")
  }

  const openMenuBar = () =>{
    document.getElementById("sidenav").style.transition = "1s";
    document.getElementById("sidenav").style.left = "0";
    console.log("OPEN")
  }

  return(
    <motion.div
        style={AboutmeStyles.subpagewidth}
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{ duration: 0.3 }}
        exit={{opacity:0}}
      >

      <Menu menuList={portfolioTitles} switchLang={setAllLanguage}/>
      <MobileMenu menuList={portfolioTitles} switchLang={setAllLanguage} openMenuBar={openMenuBar} closeMenuBar={closeMenuBar}/>

      <div class="about-container-sub">
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
        <div class="about-picture-sub">
          <Image data={data.allAboutmes[0].aboutme.responsiveImage} />
        </div>
      </div>
    </motion.div>
  )
}

const AboutmeStyles = {
  subpagewidth: {
    maxWidth: "100rem",
    margin: "0 auto",
    padding: "0 10vw",
  },
  responsiveMasonry: {
    paddingTop: "8rem"
  },
  portfolioTitle:{
    textAlign: "left",
    paddingLeft: "0",
    paddingBottom: "3vw",
    fontSize: "5.5vw",
    color: "white"
  }
};
export default Aboutme;
