import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header className="siteheader">
    <div className="header-content">
      <p className="para">
        <Link className="navlink" to="/">{siteTitle}</Link>
        <Link className="navlink" to="/historia">historia</Link>
        <Link className="navlink" to="/treeni">treenaa</Link>
      </p>
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
