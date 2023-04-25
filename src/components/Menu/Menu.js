import './menu.css';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
const Menu = (props) => {
  function switchLang(){
    if (localStorage.getItem("language") === "hungarian"){
      localStorage.setItem("language", "english");
    } else {
          localStorage.setItem("language", "hungarian");
    }
    props.switchLang();
  }

  return(
    <div id="menu-bar">
      <div className="menu-title">
      <HashLink smooth to={"/#home"}>
        <a language="english"  >Home</a>
        <a language="hungarian" >Főoldal</a>
      </HashLink>
      </div>

      <div className="menu-title">
        <HashLink smooth to={"/aboutme"}>
          <a language="english" href="/" >About me</a>
          <a language="hungarian" href="/" >Rólam</a>
        </HashLink>

        {/* <div className="dropdown-content" >
          <Link to={"/"}>
            <a language="english" href="/">Aknowledgements</a>
            <a language="hungarian" href="/" >Elismerések</a>
          </Link>
        </div> */}

      </div>

      <div className="menu-title dropdown">
        <HashLink smooth to="/#portfolio">
          <a language="english" className="dropbtn " >Portfolio</a>
          <a language="hungarian" className="dropbtn " >Portfólió</a>
        </HashLink>

        <div className="dropdown-content">
          {props.menuList.map((menuItem, i) => (
            <Link to={"/"+ menuItem[0]} key={i}>
              <span language="english">{menuItem[0].charAt(0).toUpperCase() + menuItem[0].slice(1)}</span>
              <span language="hungarian">{menuItem[1].charAt(0).toUpperCase() + menuItem[1].slice(1)}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="menu-title">
        <HashLink to={"/#impressum"}>
          <a language="english" >Services</a>
          <a language="hungarian"  >Szolgáltatások</a>
        </HashLink>
      </div>
      <div className="menu-title">
        <HashLink to={"/#impressum"}>
          <a language="english"  >Contact</a>
          <a language="hungarian"  >Kapcsolat</a>
        </HashLink>
      </div>
      <div className="menu-title flag-width" id = "flag" onClick={switchLang}>
        <img language="english" style={MenuStyles.flagPicture} src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Flag_of_Hungary.svg" alt="Magyar nyelvű oldal" ></img>
        <img language="hungarian" style={MenuStyles.flagPicture} src="https://upload.wikimedia.org/wikipedia/commons/4/42/Flag_of_the_United_Kingdom.png" alt="Change to english"></img>
      </div>
      <div className="social-media-icons menu-title">
        <div >
          <a href="https://www.facebook.com/stellanphoto" aria-label="Facebook"><FontAwesomeIcon icon={faFacebookF}/></a>
        </div>
        <div>
          <a href="https://www.instagram.com/stellanphoto/" aria-label="Instagram"><FontAwesomeIcon icon={faInstagram}/></a>
        </div>
      </div>
    </div>
  )

}
const MenuStyles = {
  flagPicture:{
    height: "1.3vw",
    cursor: "pointer",
    margin: "0 auto",
    marginTop : "6px",
  }
}

export default Menu
