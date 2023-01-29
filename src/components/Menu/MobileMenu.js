import './menu.css';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import {useState, useEffect, React} from 'react';
import { HashLink } from 'react-router-hash-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,  faCaretDown,  faLocationDot } from '@fortawesome/free-solid-svg-icons'
import $ from 'jquery';

const MobileMenu = (props) => {

  useEffect(() => {

  });

const [myvalue, setValue] = useState(1);

function switchLang(){
  if (localStorage.getItem("language") === "hungarian"){
    localStorage.setItem("language", "english");
  } else {
        localStorage.setItem("language", "hungarian");
  }

  props.switchLang();
}

/////////////////////////////////////////////////////////////////

function openMenuBar(){
  props.openMenuBar()
}

function closeMenuBar(){
  props.closeMenuBar()
}

function handleDropDown(){
  var dropdown = document.getElementById("portfolio-dropdown")
  dropdown.classList.toggle("active");
  var dropdownContent = dropdown.nextElementSibling;
  if (dropdownContent.style.display === "block") {
    dropdownContent.style.display = "none";
  } else {
    dropdownContent.style.display = "block";
  }
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
          <FontAwesomeIcon icon={faBars} className="menu-icon"/>
        </div>
      </div>

      <div id="sidenav" style={sidenavStyle}>
        <span className="close-navbar" onClick={closeMenuBar}>×</span>
        <HashLink smooth to={"/#home"}>
          <span language="english" className="page-part" onClick={closeMenuBar}>Home</span>
          <span language="hungarian" className="page-part" onClick={closeMenuBar} >Főoldal</span>
        </HashLink>

        <HashLink smooth to={"/#aboutme"}>
          <span language="english" className="page-part" onClick={closeMenuBar}>About me</span>
          <span language="hungarian" className="page-part" onClick={closeMenuBar}>Rólam</span>
        </HashLink>

        <button className="dropdown-btn" id="portfolio-dropdown" onClick={handleDropDown}>
          <span language="english" className="dropbtn page-part dropdown-span" id="portfolio-dropdown-title" >Portfolio</span>
          <span language="hungarian" className="dropbtn page-part dropdown-span" id="portfolio-dropdown-title">Portfólió</span>
          <FontAwesomeIcon icon={faCaretDown} className="fa-caret-down" id="portfolio-dropdown-caret"/>
        </button>
        <div className="dropdown-container">
          {props.menuList.map((menuItem, i) => (
            <Link to={"/"+ menuItem[0]} key={i}>

              <span language="english">{menuItem[0].charAt(0).toUpperCase() + menuItem[0].slice(1)}</span>
              <span language="hungarian">{menuItem[1].charAt(0).toUpperCase() + menuItem[1].slice(1)}</span>
            </Link>
          ))}
        </div>

        {/* <Link to={"/services"}>
          <span language="english" className="page-part" onClick={closeMenuBar}>Services</span>
          <span language="hungarian" className="page-part" onClick={closeMenuBar}>Szolgáltatások</span>
        </Link> */}

        <HashLink smooth to={"/#services"}>
          <span language="english" className="page-part" onClick={closeMenuBar}>Services</span>
          <span language="hungarian" className="page-part" onClick={closeMenuBar}>Szolgáltatások</span>
        </HashLink>


        <HashLink smooth to={"/#contact"}>
          <span language="english" className="page-part" onClick={closeMenuBar}>Contact</span>
          <span language="hungarian" className="page-part" onClick={closeMenuBar}>Kapcsolat</span>
        </HashLink>

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
