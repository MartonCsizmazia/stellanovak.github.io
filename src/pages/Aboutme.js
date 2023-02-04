import Menu from "../components/Menu/Menu";
import MobileMenu from "../components/Menu/MobileMenu";
import { motion } from 'framer-motion';
import {useEffect} from 'react';
import { useQuery } from "graphql-hooks";
import { Image } from 'react-datocms';
import './aboutme.css';
// import logo from './Elismeresek/DSC00556-01_318991180584136-02.jpeg';

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
              {/* <p language="english" class="about-line"> My interest in the world of photography started already in my childhood, and I started taking photography more seriously in 2015.
In 2016, I became a photographer for the Corvinus University of Budapest, a year later I photographed the concerts of bands supported by the DRK brand, and then I also worked as a press
photographer for the Károli Gáspár Református University for a couple of years. One of the biggest honors came in December 2019, when FINA invited me to participate in the World Junior
Water Polo Championship in Kuwait as the event's official photographer.

In addition to my larger works, I also photographed weddings, portraits, families and animals a lot. Over the years, I realized that in addition to the more "adventurous" work, I also
really enjoy these more private events, because I can give my clients photos that they can look at with great happiness and love for years.

In December of this year, another huge honor came to me, I was invited to the Tihany Abátsági Rege Cukrászda for a month-long large-scale independent exhibition with landscape and bird
photos. Nature attracted me and was close to me all my life, during trips my camera was always hidden in my bag so that I could capture the landscapes I wandered through. At the end of
December last year, I moved to the Netherlands for 4 months, where I visited the nearby landscapes on a daily basis to photograph birds. I didn't even notice it, but after a while I "woke up"
 with the forest every morning and even by paying attention to the smallest nests I found the birds hiding among the leaves of the trees... I accepted the invitation with great joy, and the
 exhibition can be viewed in person until March 3, 2023. . The online exhibition is available here:


<a class="hyperlink-in-aboutme" href="https://madar-tavlatbol.fenykepeszkor.hu/."> https://madar-tavlatbol.fenykepeszkor.hu/.</a></p> */}

              <p language="english" class="about-line">Coming soon in english! <br></br><br></br>Már gyermekkoromban kezdődött az érdeklődés a fényképezés világa iránt, komolyabban pedig 2015-ben kezdtem foglalkozni a fotózással.
                2016-ban a Budapesti Corvinus Egyetem fotósa lettem, egy évvel később már a DRK márka által támogatott zenekarok koncertjeit fotóztam, majd a Károli Gáspár Református Egyetem sajtófotósaként is dolgoztam pár éven át. 2019 decemberében ért az egyik legnagyobb megtiszteltetés, amikor a FINA felkért, hogy résztvegyek a kuwaiti junior vízilabda világbajnokságon a rendezvény hivatalos fotósaként.

                A nagyobb munkáim mellett esküvőket, portrékat, családokat és állatokat is nagyon sokat fotóztam. Az évek alatt rájöttem, hogy nagyon élvezem a "kalandosabb" munkák mellett ezeket a privátabb eseményeket is, ugyanis olyan fényképeket tudok átadni az ügyfeleimnek, melyeket nagy boldogsággal és szeretettel nézhetnek éveken át.

                Idén decemberben ért egy újabb hatalmas megtiszteltetés, a Tihanyi Apátsági Rege Cukrászdába felkértek egy egész hónapos nagyszabású önálló kiállításra táj és madár fotókkal. A természet egész életemben vonzott és közel állt hozzám, kirándulások alkalmával a gépem mindig a táskámban lapult, hogy megörökíthessem a bebarangolt tájakat. Tavaly december végén kiköltöztem Hollandiába 4 hónapra, ahol napi szinten jártam a közeli tájakra madarakat fotózni. Észre se vettem, de egy idő után minden reggel az erdővel "ébredtem" és már a legapróbb neszekre figyelve is megtaláltam a fák lombjai között bújkáló madarakat… Hatalmas örömmel fogadtam el a felkérést, a kiállítás pedig még 2023. Március 3-ig megtekinthető személyesen is. Az online kiállítás pedig itt elérhető:


                  <a class="hyperlink-in-aboutme" href="https://madar-tavlatbol.fenykepeszkor.hu/.">   https://madar-tavlatbol.fenykepeszkor.hu/. </a></p>
              <p language="hungarian" class="about-line"> Már gyermekkoromban kezdődött az érdeklődés a fényképezés világa iránt, komolyabban pedig 2015-ben kezdtem foglalkozni a fotózással.
                2016-ban a Budapesti Corvinus Egyetem fotósa lettem, egy évvel később már a DRK márka által támogatott zenekarok koncertjeit fotóztam, majd a Károli Gáspár Református Egyetem sajtófotósaként is dolgoztam pár éven át. 2019 decemberében ért az egyik legnagyobb megtiszteltetés, amikor a FINA felkért, hogy résztvegyek a kuwaiti junior vízilabda világbajnokságon a rendezvény hivatalos fotósaként.

                A nagyobb munkáim mellett esküvőket, portrékat, családokat és állatokat is nagyon sokat fotóztam. Az évek alatt rájöttem, hogy nagyon élvezem a "kalandosabb" munkák mellett ezeket a privátabb eseményeket is, ugyanis olyan fényképeket tudok átadni az ügyfeleimnek, melyeket nagy boldogsággal és szeretettel nézhetnek éveken át.

                Idén decemberben ért egy újabb hatalmas megtiszteltetés, a Tihanyi Apátsági Rege Cukrászdába felkértek egy egész hónapos nagyszabású önálló kiállításra táj és madár fotókkal. A természet egész életemben vonzott és közel állt hozzám, kirándulások alkalmával a gépem mindig a táskámban lapult, hogy megörökíthessem a bebarangolt tájakat. Tavaly december végén kiköltöztem Hollandiába 4 hónapra, ahol napi szinten jártam a közeli tájakra madarakat fotózni. Észre se vettem, de egy idő után minden reggel az erdővel "ébredtem" és már a legapróbb neszekre figyelve is megtaláltam a fák lombjai között bújkáló madarakat… Hatalmas örömmel fogadtam el a felkérést, a kiállítás pedig még 2023. Március 3-ig megtekinthető személyesen is. Az online kiállítás pedig itt elérhető:


                  <a class="hyperlink-in-aboutme" href="https://madar-tavlatbol.fenykepeszkor.hu/.">   https://madar-tavlatbol.fenykepeszkor.hu/. </a></p>
              <br></br>
            </p>
          </article>
        </div>
        <div class="about-picture-sub">
          <Image data={data.allAboutmes[0].aboutme.responsiveImage} />
        </div>
      </div>


      {/* <div class="about-container-sub">
        <div class="about-text">
          <article>
            <p>
              <p language="english" class="aknowledgment-line">I have worked as a photographer for almost 6 years, it's my passion as well as my job. I love catching moments and making them last forever in my pictures.</p>
              <p language="hungarian" class="aknowledgment-line"></p>

              <br></br>
            </p>
          </article>
        </div>
        <div class="about-picture-sub">

          <img src={logo} alt="marriage" className="temp-image"></img>

        </div>
      </div> */}
    </motion.div>
  )
}

const AboutmeStyles = {
  subpagewidth: {
    maxWidth: "100rem",
    margin: "0 auto",
    // padding: "0 10vw",
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
