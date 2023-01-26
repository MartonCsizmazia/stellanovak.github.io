import { useQuery } from "graphql-hooks";
import { Image } from 'react-datocms';
import Menu from "../components/Menu/Menu";
import {useEffect} from 'react';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import MobileMenu from "../components/Menu/MobileMenu";
import { Helmet } from "react-helmet";
import { motion } from 'framer-motion';
import './portfoliosubpage.css';

const PortfolioSubPage = (props) => {

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

  //dynamic query creator
  let upperProps = props.title.toString().charAt(0).toUpperCase() + props.title.slice(1)

  let HOMEPAGE_QUERY = `query HomePage($limit: IntType) {
    all` + pluralize(upperProps.toString()) + `(first: $limit) {
      ` + props.title.toString() + `{
        filename
        title
        responsiveImage {
          src
          width
          height
          title
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

  let subPageName = upperProps.toString()
  let isCurrentPortfolioPlural = false

  let hunSubPageName = ''
  data['allPortfolios'][0]['portfolio'].forEach(category => {
    if(pluralize(subPageName) == pluralize(category.title)){
      hunSubPageName = category.customData.hungarian
      if(pluralize(subPageName) == category.title){
        subPageName = pluralize(subPageName)
      }
    }
  })

  return (
    <motion.div
      style={PortfolioSubPageStyles.subpagewidth}
      initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}
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

      <Menu menuList={portfolioTitles} switchLang={setAllLanguage}/>
      <MobileMenu menuList={portfolioTitles} switchLang={setAllLanguage} openMenuBar={openMenuBar} closeMenuBar={closeMenuBar}/>

      <div style={PortfolioSubPageStyles.responsiveMasonry}>
        <div style={PortfolioSubPageStyles.portfolioTitle}>
          <span language="english">{subPageName}</span>
          <span language="hungarian">{hunSubPageName}</span>
        </div>
        <ResponsiveMasonry
            columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
        >
            <Masonry gutter="1.5rem">
                {data['all' + pluralize(upperProps.toString())][0][props.title.toString()]
                .map((image, i) => (
                    <img
                        key={i}
                        src={image.responsiveImage.src}
                        style={{width: "100%", display: "block"}}
                        alt={image.title}
                        className={"subPageImage"}
                    />

                ))}
            </Masonry>
        </ResponsiveMasonry>
      </div>
    </motion.div>
  )
}

const PortfolioSubPageStyles = {
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
    fontSize: "4vw",
  }
};

export default PortfolioSubPage;
