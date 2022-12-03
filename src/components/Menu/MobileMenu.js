import './menu.css';
import { Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar, sidebarClasses } from 'react-pro-sidebar';

const MobileMenu = (props) => {

function switchLang(){
  if (localStorage.getItem("language") === "hungarian"){
    localStorage.setItem("language", "english");
  } else {
        localStorage.setItem("language", "hungarian");
  }
  console.log(localStorage.getItem("language"))
  props.switchLang();
}

const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } = useProSidebar();

  return (
    <div>
      <Sidebar
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          backgroundColor: 'red',
          collapsedWidth: "200px"
        },
      }}>
        <Menu
        menuItemStyles={{
          button: ({ level, active, disabled }) => {
            // only apply styles on first level elements of the tree
            if (level === 0)
              return {
                // color: disabled ? 'red' : 'red',
                backgroundColor: active ? '#eecef9' : "blue",
                defaultCollapsed: true
              };
          },
        }}
        >
          <MenuItem>
              <span language="english">Home</span>
              <span language="hungarian">Főoldal</span>
          </MenuItem>
          <SubMenu label="Portfolio">
            <MenuItem>
              <span language="english">Pie charts</span>
              <span language="hungarian">pite ábra</span>
            </MenuItem>
            <MenuItem> Line charts </MenuItem>
          </SubMenu>
          <MenuItem>
            <span language="english">About me</span>
            <span language="hungarian">Rólam</span>
          </MenuItem>
          <MenuItem>
            <span language="english">Contact</span>
            <span language="hungarian">Kapcsolat</span>
          </MenuItem>
        </Menu>
      </Sidebar>
      <span onClick={() => collapseSidebar()}>×</span>
      {/* <div id="menu-button-line">
        <div className="icon" onClick={openMenuBar()} id="menu-button">
            <i className="fa fa-bars" id="menu-icon"></i><span language="english" className="menu-button-title" id="menu-title-id"> Menu</span><span language="hungarian" className="menu-button-title" id="menu-title-id"> Menü</span>
        </div>
      </div>

      <div id="sidenav">
        <span className="close-navbar" onclick={closeMenuBar()}>×</span>

        <a language="english" href="#home" className="page-part" onclick={closeMenuBar()}>Home</a>
        <a language="hungarian" href="#home" className="page-part" onclick={closeMenuBar()} >Főoldal</a>
        <button className="dropdown-btn" id="portfolio-dropdown">
          <span className="dropbtn page-part dropdown-span" id="portfolio-dropdown-title">Portfolio</span>
          <i className="fa fa-caret-down" id="portfolio-dropdown-caret"></i>
        </button>
        <div className="dropdown-container">
          {props.menuList.map((menuItem, i) => (
            <Link to={"/"+ menuItem} key={i}>
              {console.log(menuItem)}
              {menuItem.charAt(0).toUpperCase() + menuItem.slice(1)}
            </Link>

          ))}
        </div>
        <a language="english" href="#about" className="page-part" onclick={closeMenuBar()}>About me</a>
        <a language="hungarian" href="#about" className="page-part" onclick={closeMenuBar()}>Rólam</a>
        <a href="#contact" className="page-part" onclick={closeMenuBar()}>Contact</a>
        <div className= "mobile-flag" onclick={setTimeout(switchLang, 1000)}>
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
      </div> */}

    </div>
  )
}

const MobilemenuStyles = {
  flagPicture:{
    height: "2vw",
    cursor: "pointer",
    margin: "0 auto"
  }
}

export default MobileMenu
