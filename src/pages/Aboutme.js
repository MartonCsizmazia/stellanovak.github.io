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
    allAknowledgements {
      aknowledgement {
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
              <p language="english" class="about-line">Coming soon in english! <br></br><br></br>Már gyermekkoromban kezdődött az érdeklődés a fényképezés világa iránt, komolyabban pedig 2015-ben kezdtem foglalkozni a fotózással.
                2016-ban a Budapesti Corvinus Egyetem fotósa lettem, egy évvel később már a DRK márka által támogatott zenekarok koncertjeit fotóztam, majd a Károli Gáspár Református Egyetem sajtófotósaként is dolgoztam pár éven át. 2019 decemberében ért az egyik legnagyobb megtiszteltetés, amikor a FINA felkért, hogy résztvegyek a kuwaiti junior vízilabda világbajnokságon a rendezvény hivatalos fotósaként.

                A nagyobb munkáim mellett esküvőket, portrékat, családokat és állatokat is nagyon sokat fotóztam. Az évek alatt rájöttem, hogy nagyon élvezem a "kalandosabb" munkák mellett ezeket a privátabb eseményeket is, ugyanis olyan fényképeket tudok átadni az ügyfeleimnek, melyeket nagy boldogsággal és szeretettel nézhetnek éveken át.

                Idén decemberben ért egy újabb hatalmas megtiszteltetés, a Tihanyi Apátsági Rege Cukrászdába felkértek egy egész hónapos nagyszabású önálló kiállításra táj és madár fotókkal. A természet egész életemben vonzott és közel állt hozzám, kirándulások alkalmával a gépem mindig a táskámban lapult, hogy megörökíthessem a bebarangolt tájakat. Tavaly december végén kiköltöztem Hollandiába 4 hónapra,
                ahol napi szinten jártam a közeli tájakra madarakat fotózni. Észre se vettem, de egy idő után minden reggel az erdővel "ébredtem" és már a legapróbb neszekre figyelve is megtaláltam a fák lombjai között bújkáló madarakat… Hatalmas örömmel fogadtam el a felkérést, a kiállítás pedig még 2023. Március 3-ig megtekinthető személyesen is. Az online kiállítás pedig itt elérhető:


                  <a class="hyperlink-in-aboutme" href="https://madar-tavlatbol.fenykepeszkor.hu/." target="_blank">   https://madar-tavlatbol.fenykepeszkor.hu/. </a></p>
              <p language="hungarian" class="about-line"> Már gyermekkoromban kezdődött az érdeklődés a fényképezés világa iránt, komolyabban pedig 2015-ben kezdtem foglalkozni a fotózással.
                2016-ban a Budapesti Corvinus Egyetem fotósa lettem, egy évvel később már a DRK márka által támogatott zenekarok koncertjeit fotóztam, majd a Károli Gáspár Református Egyetem sajtófotósaként is dolgoztam pár éven át. 2019 decemberében ért az egyik legnagyobb megtiszteltetés, amikor a FINA felkért, hogy résztvegyek a kuwaiti junior vízilabda világbajnokságon a rendezvény hivatalos fotósaként.

                A nagyobb munkáim mellett esküvőket, portrékat, családokat és állatokat is nagyon sokat fotóztam. Az évek alatt rájöttem, hogy nagyon élvezem a "kalandosabb" munkák mellett ezeket a privátabb eseményeket is, ugyanis olyan fényképeket tudok átadni az ügyfeleimnek, melyeket nagy boldogsággal és szeretettel nézhetnek éveken át.

                Idén decemberben ért egy újabb hatalmas megtiszteltetés, a Tihanyi Apátsági Rege Cukrászdába felkértek egy egész hónapos nagyszabású önálló kiállításra táj és madár fotókkal. A természet egész életemben vonzott és közel állt hozzám, kirándulások alkalmával a gépem mindig a táskámban lapult, hogy megörökíthessem a bebarangolt tájakat. Tavaly december végén kiköltöztem Hollandiába 4 hónapra,
                ahol napi szinten jártam a közeli tájakra madarakat fotózni. Észre se vettem, de egy idő után minden reggel az erdővel "ébredtem" és már a legapróbb neszekre figyelve is megtaláltam a fák lombjai között bújkáló madarakat… Hatalmas örömmel fogadtam el a felkérést, a kiállítás pedig még 2023. Március 3-ig megtekinthető személyesen is. Az online kiállítás pedig itt elérhető:


                  <a class="hyperlink-in-aboutme" href="https://madar-tavlatbol.fenykepeszkor.hu/." target="_blank">  https://madar-tavlatbol.fenykepeszkor.hu/. </a></p>
              <br></br>
            </p>
          </article>
        </div>
        <div class="about-picture-sub">
          <Image data={data.allAboutmes[0].aboutme.responsiveImage} />
        </div>
      </div>

{/* ///////////////////////////////////////////////////////// */}
    <div className="aknowledgements">
      <div class="about-container-sub small-article-container right-article-container">
        <div class="about-text-article left-article">
          <article>
            <p>
              <p language="english" class="about-line"> 2019. III-ik Budapesti Fotósviadal különdíjasa (Elkapott pillanat)
              </p>
              <p language="hungarian" class="about-line"> 2019. III-ik Budapesti Fotósviadal különdíjasa (Elkapott pillanat)
              </p>
              <br></br>
            </p>
          </article>
        </div>
        <div class="aknowledgement-picture-sub right-picture">
          <Image data={data.allAknowledgements[0].aknowledgement[3].responsiveImage} />
        </div>
      </div>


      <div class="about-container-sub left-article-container">
        <div class="about-text-article left-article">
          <article>
            <p>
              <p language="english" class="about-line">2021. Magyarország 365 pályázat albumába választott kép (Just married címmel, 37000 alkotásból 365 lett kiválasztva)
              </p>
              <p language="hungarian" class="about-line"> 2021. Magyarország 365 pályázat albumába választott kép (Just married címmel, 37000 alkotásból 365 lett kiválasztva)
              </p>
              <br></br>
            </p>
          </article>
        </div>
        <div class="aknowledgement-picture-sub right-picture">
          <Image data={data.allAknowledgements[0].aknowledgement[1].responsiveImage} />
        </div>
      </div>

      <div class="about-container-sub small-article-container right-article-container">
        <div class="about-text-article left-article">
          <article>
            <p>
              <p language="english" class="about-line"> 2022. Volán-Egyesülés Közösségi közlekedés fotós szemmel pályázat. 3-ik helyezett "életképek" kategóriában (Hazaút címmel)
              </p>
              <p language="hungarian" class="about-line"> 2022. Volán-Egyesülés Közösségi közlekedés fotós szemmel pályázat. 3-ik helyezett "életképek" kategóriában (Hazaút címmel)
              </p>
              <br></br>
            </p>
          </article>
        </div>
        <div class="aknowledgement-picture-sub right-picture">
          <Image data={data.allAknowledgements[0].aknowledgement[2].responsiveImage} />
        </div>
      </div>


      <div class="about-container-sub left-article-container">
        <div class="about-text-article left-article">
          <article>
            <p>
              <p language="english" class="about-line">2022. Magyarország 365 pályázat albumába választott kép sorozat ( "Egy kis Amerika Budapesten" címmel, 38000 alkotásból 365 lett kiválasztva, ebből 4 képet én készítettem)
              </p>
              <p language="hungarian" class="about-line"> 2022. Magyarország 365 pályázat albumába választott kép sorozat ( "Egy kis Amerika Budapesten" címmel, 38000 alkotásból 365 lett kiválasztva, ebből 4 képet én készítettem)
              </p>
              <br></br>
            </p>
          </article>
        </div>
        <div class="aknowledgement-picture-sub right-picture">
          <Image data={data.allAknowledgements[0].aknowledgement[0].responsiveImage} />
        </div>
      </div>

      <div class="about-container-sub small-article-container right-article-container">
        <div class="about-text-article left-article">
          <article>
            <p>
              <p language="english" class="about-line"> 2023. Február: A Tihanyi Apátsági Rege Cukrászdában felkértek az első nagyszabású önálló kiállításomra.
                <a class="hyperlink-in-aboutme" href="https://madar-tavlatbol.fenykepeszkor.hu/." target="_blank"> https://madar-tavlatbol.fenykepeszkor.hu/. </a>

              </p>
              <p language="hungarian" class="about-line"> 2023. Február: A Tihanyi Apátsági Rege Cukrászdában felkértek az első nagyszabású önálló kiállításomra.
                <a class="hyperlink-in-aboutme" href="https://madar-tavlatbol.fenykepeszkor.hu/." target="_blank"> https://madar-tavlatbol.fenykepeszkor.hu/. </a>

              </p>
              <br></br>
            </p>
          </article>
        </div>
        <div class="aknowledgement-picture-sub right-picture">
          <Image data={data.allAknowledgements[0].aknowledgement[4].responsiveImage} />
        </div>
      </div>
    </div>
    </motion.div>
  )
}

const AboutmeStyles = {
  subpagewidth: {
    maxWidth: "100rem",
    margin: "0 auto",
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
