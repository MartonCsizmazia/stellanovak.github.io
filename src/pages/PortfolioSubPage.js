import { useQuery } from "graphql-hooks";
import { Image } from 'react-datocms';
import Menu from "../components/Menu/Menu";
import {useEffect} from 'react';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"



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
  if (loading) return "Loading...";
  if (error) return "Something Bad Happened";
  //CMS

  //collecting portfolio titles for menu
  let portfolioTitles = data.allPortfolios[0].portfolio
                          .sort((a, b) => a.customData.custom_order - b.customData.custom_order)
                          .map(portfolioTitles =>(portfolioTitles.title))

  return (
    <div style={PortfolioSubPageStyles.subpagewidth}>
      <Menu menuList={portfolioTitles} switchLang={setAllLanguage}/>

      <div style={PortfolioSubPageStyles.responsiveMasonry}>
        <div style={PortfolioSubPageStyles.portfolioTitle}>
          {window.location.pathname.toString().charAt(1).toUpperCase() + window.location.pathname.slice(2)}
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
                    />
                ))}
            </Masonry>
        </ResponsiveMasonry>
      </div>
      {/* {data['all' + pluralize(upperProps.toString())][0][props.title.toString()]
        .map(picture => (
          <div key={picture.title}>
              <Image className='image' data={picture.responsiveImage} />
          </div>
      ))} */}
    </div>
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
