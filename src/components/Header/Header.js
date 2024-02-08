import React, { useState } from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types";
import NotificationBanner from '../NotificationBanner';
import IdentityModal, { useIdentityContext } from "react-netlify-identity-widget"
import "react-netlify-identity-widget/styles.css"
import Button from "../Button"
import * as styles from './Header.module.css';


// applied to the currently active page/link
const activeStyles = { background: "#397194", color:"#F1EEF6"};

const Header = ({ siteTitle, pageName }) => {
  const [dialog, setDialog] = useState(false);
  const [showBanner, setShowBanner] = useState();
  const identity = useIdentityContext();
  const isLoggedIn = identity && identity.isLoggedIn;

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
                <Link to="/plant-listing" activeStyle={activeStyles} partiallyActive={true}>Plant Availability</Link> |
                <Link to="/contact" activeStyle={activeStyles}>Contact</Link> |
                {!isLoggedIn && <Link to="/apply" activeStyle={activeStyles}>Become a Customer</Link>}
                {isLoggedIn && <Link to="/reseller" activeStyle={activeStyles}>Reseller</Link>}
              </div>
              <div className={styles.right}>
                <Button className="link" onClick={() => setDialog(true)}>
                  {isLoggedIn ? `Log Out` : "Log In"}
                </Button>
              </div>
            </nav>
        </div>

      </header>
      <IdentityModal
        showDialog={dialog}
        onCloseDialog={() => setDialog(false)}
        onSignup={() => setShowBanner(true)}
      />
      { showBanner &&
        <NotificationBanner
          msg="Thanks for signing up. Don't forget to confirm your email address."
        />
      }
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
