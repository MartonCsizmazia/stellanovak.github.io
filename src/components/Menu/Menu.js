import './menu.css';
import { Link } from 'react-router-dom';

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
        <a language="english" href="/" >Home</a>
        <a language="hungarian" href="/" >Főoldal</a>
      </div>
      <div className="menu-title dropdown">
        <a language="english" href="/" className="dropbtn page-part" >Portfolio</a>
        <a language="hungarian" href="/" className="dropbtn page-part" >Galéria</a>
        <div className="dropdown-content">
          {props.menuList.map((menuItem, i) => (
            <Link to={"/"+ menuItem[0]} key={i}>
              <span language="english">{menuItem[0].charAt(0).toUpperCase() + menuItem[0].slice(1)}</span>
              <span language="hungarian">{menuItem[1].charAt(0).toUpperCase() + menuItem[1].slice(1)}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="menu-title dropdown">
        <a language="english" href="/" >About me</a>
        <a language="hungarian" href="/" >Rólam</a>
        <div className="dropdown-content" >
          <a language="english" href="/">Aknowledgements</a>
          <a language="hungarian" href="/" >Elismerések</a>
        </div>
      </div>
      <div className="menu-title">
        <a language="english" href="/" >Contact</a>
        <a language="hungarian" href="/" >Kapcsolat</a>
      </div>
      <div className="menu-title" id = "flag" onClick={switchLang}>
        <img language="english" style={MenuStyles.flagPicture} src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Flag_of_Hungary.svg" alt="Magyar nyelvű oldal" ></img>
        <img language="hungarian" style={MenuStyles.flagPicture} src="https://upload.wikimedia.org/wikipedia/commons/4/42/Flag_of_the_United_Kingdom.png" alt="Change to english"></img>
      </div>
      <div className="social-media-icons menu-title">
        <div >
          <a href="https://www.facebook.com/stellanovakphoto" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
        </div>
        <div >
          <a href="https://www.instagram.com/nesztiii/" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
        </div>
      </div>
    </div>
  )

}
const MenuStyles = {
  flagPicture:{
    height: "2vw",
    cursor: "pointer",
    margin: "0 auto"
  }
}

export default Menu
