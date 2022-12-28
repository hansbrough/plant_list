import React, {useState} from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import IdentityModal, { useIdentityContext } from "react-netlify-identity-widget"
import "react-netlify-identity-widget/styles.css"
import Button from "../Button"
import * as styles from './Header.module.css';


// applied to the currently active page/link
const activeStyles = { background: "#397194", color:"#F1EEF6"};

const Header = ({ siteTitle, pageName }) => {
  console.log("Header pageName:",pageName)
  const [dialog, setDialog] = useState(false);
  const identity = useIdentityContext();
  const name = (identity && identity.user && identity.user.user_metadata && identity.user.user_metadata.name) || "NoName"
  const isLoggedIn = identity && identity.isLoggedIn

  return (
    <>
      <header
        className={`${pageName} page-header`}
        style={{
          background: `#457B9D`,
        }}
      >
        <div className={styles.innerContainer}>
          {(pageName !== 'home') &&
            <h1 className={styles.nonHomeHeader}>
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
            <nav className={styles.pageNav}>
              <div className={styles.left}>
                <Link to="/plant-listing" activeStyle={activeStyles} partiallyActive={true}>Plant Availability</Link> | <Link to="/contact" activeStyle={activeStyles}>Contact</Link>
              </div>
              <div className={styles.right}>
                <Button className="link" onClick={() => setDialog(true)}>
                  {isLoggedIn ? `Log Out` : "Log In"}
                </Button>
              </div>
            </nav>
        </div>

      </header>
      <IdentityModal showDialog={dialog} onCloseDialog={() => setDialog(false)} />
    </>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
