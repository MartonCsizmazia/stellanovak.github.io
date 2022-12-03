import './menu.css';

const Menu = (props) => {
  return(
    <div id="menu-bar">
      <div className="menu-title">
        <a language="english" href="/" >Home</a>
        {/* <a language="hungarian" href="/" >Főoldal</a> */}
      </div>
      <div className="menu-title dropdown">
        <a language="english" href="/#portfolio" className="dropbtn page-part" >Portfolio</a>
        {/* <a language="hungarian" href="/#portfolio" className="dropbtn page-part" >Galéria</a> */}
        <div className="dropdown-content">
          {/* <% @portfolio_categories.each do |category|%>
            <a href="/<%=category %>"> <%=category.capitalize() %> </a>
          <% end %> */}
          {props.menuList.map(menuItem => (
            <a href={menuItem}>{menuItem.charAt(0).toUpperCase() + menuItem.slice(1)} </a>
          ))}
        </div>
      </div>
      <div className="menu-title dropdown">
        <a language="english" href="/#about" >About me</a>
        {/* <a language="hungarian" href="/#about" >Rólam</a> */}
        <div className="dropdown-content" >
          <a language="english" href="/#aknowledgements">Aknowledgements</a>
          {/* <a language="hungarian" href="/#aknowledgements" >Elismerések</a> */}
        </div>
      </div>
      <div className="menu-title">
        <a language="english" href="/#contact" >Contact</a>
        {/* <a language="hungarian" href="/#contact" >Kapcsolat</a> */}
      </div>
        <div className="menu-title" id = "flag">
        {/* <%= image_tag 'flags/flag-400.png', language: "english", alt: 'Magyar nyelvű oldal', id: 'flag-picture', style: "width: 20%; cursor: pointer"%>
        <%= image_tag 'flags/illustration-uk-flag_53876-18166.webp', language: "hungarian", alt: 'Change to english', id: 'flag-picture', style: "width: 20%; cursor: pointer"%> */}
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

export default Menu
