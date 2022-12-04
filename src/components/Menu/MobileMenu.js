import './menu.css';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import {useState, useEffect, React} from 'react';

const MobileMenu = (props) => {

  useEffect(() => {
    var dropdown = document.getElementsByClassName("dropdown-btn");
    var i;

    for (i = 0; i < dropdown.length; i++) {
      dropdown[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var dropdownContent = this.nextElementSibling;
      if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
      } else {
      dropdownContent.style.display = "block";
      }
      });
    }

  });

const [myvalue, setValue] = useState(1);

function switchLang(){
  if (localStorage.getItem("language") === "hungarian"){
    localStorage.setItem("language", "english");
  } else {
        localStorage.setItem("language", "hungarian");
  }
  // console.log(localStorage.getItem("language"))
  props.switchLang();
}

/////////////////////////////////////////////////////////////////

function openMenuBar(){
  props.openMenuBar()
}

function closeMenuBar(){
  props.closeMenuBar()
}

//MODIFY STYLE WITH setState TO LEARN
let sidenavStyle = {
  // left: "-17rem",
};

/////////////////////////////////////////////////////////////////

  return (
    <div>
      <div id="menu-button-line">
        <div className="icon" onClick={openMenuBar} id="menu-button">
            <i className="fa fa-bars" id="menu-icon"></i>
            <span language="english" className="menu-button-title" id="menu-title-id"> Menu</span>
            <span language="hungarian" className="menu-button-title" id="menu-title-id"> Menü</span>
        </div>
      </div>

      <div id="sidenav" style={sidenavStyle}>
        <span className="close-navbar" onClick={closeMenuBar}>×</span>

        <a language="english" href="/" className="page-part" onClick={closeMenuBar}>Home</a>
        <a language="hungarian" href="/" className="page-part" onClick={closeMenuBar} >Főoldal</a>
        <button className="dropdown-btn" id="portfolio-dropdown">
          <span language="english" className="dropbtn page-part dropdown-span" id="portfolio-dropdown-title">Portfolio</span>
          <span language="hungarian" className="dropbtn page-part dropdown-span" id="portfolio-dropdown-title">Galéria</span>
          <i className="fa fa-caret-down" id="portfolio-dropdown-caret"></i>
        </button>
        <div className="dropdown-container">
          {props.menuList.map((menuItem, i) => (
            <Link to={"/"+ menuItem[0]} key={i}>

              <span language="english">{menuItem[0].charAt(0).toUpperCase() + menuItem[0].slice(1)}</span>
              <span language="hungarian">{menuItem[1].charAt(0).toUpperCase() + menuItem[1].slice(1)}</span>
            </Link>
          ))}
        </div>
        <a language="english" href="#about" className="page-part" onClick={closeMenuBar}>About me</a>
        <a language="hungarian" href="#about" className="page-part" onClick={closeMenuBar}>Rólam</a>
        <a language="english" href="#contact" className="page-part" onClick={closeMenuBar}>Contact</a>
        <a language="hungarian" href="#contact" className="page-part" onClick={closeMenuBar}>Kapcsolat</a>
        <div className= "mobile-flag" onClick={switchLang}>
          <img language="english" style={MobilemenuStyles.flagPicture} src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Flag_of_Hungary.svg" alt="Magyar nyelvű oldal" ></img>
          <img language="hungarian" style={MobilemenuStyles.flagPicture} src="https://upload.wikimedia.org/wikipedia/commons/4/42/Flag_of_the_United_Kingdom.png" alt="Change to english"></img>
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


    </div>

  )

}

const MobilemenuStyles = {
  flagPicture:{
    height: "1.5rem",
    cursor: "pointer",
    margin: "0 auto"
  }
}

export default MobileMenu
