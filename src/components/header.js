import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
//$color1: rgba(26, 83, 92, 1); //ENGLISH GREEN
//$color2: rgba(78, 205, 196, 1); //MEDIUM TURQUOISE
//$color3: rgba(247, 255, 247, 1); //mint cream
//$color4: rgba(255, 107, 107, 1); //pastel red
//$color5: rgba(255, 230, 109, 1); //maize

//MAASTRICHT BLUE: rgba(11, 19, 43, 1);
///yankees blue: rgba(28, 37, 65, 1);
//independence: rgba(58, 80, 107, 1);
//sea serpent: rgba(91, 192, 190, 1);
//aqua marine: rgba(111, 255, 233, 1);

// applied to the currently active page/link
const activeStyles = { background: "#397194", color:"#F1EEF6"};

const Header = ({ siteTitle, pageName }) => (
  <header
    className={`${pageName} page-header`}
    style={{
      background: `#457B9D`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        padding: `1.5rem 1rem 1rem 1rem`,
      }}
    >
      {(pageName !== 'home') && <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `#F1FAEE`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>}
      <nav className="page-nav"
        style={{
          margin: `1.25rem 0 0 0`,
        }}
      >
        <Link to="/plant-listing" activeStyle={activeStyles} partiallyActive={true}>Plant Availability</Link> | <Link to="/contact" activeStyle={activeStyles}>Contact</Link>
      </nav>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
