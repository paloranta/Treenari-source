/**
 * Layout component that queries for data
 * with Gatsby"s StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import Header from "./header"
import "./layout.css"
import Darkmode from "darkmode-js";

// Dark mode-alustus
let options = {
  saveInCookies: "false",
  mixColor: "#fff", // default: "#fff"
  backgroundColor: "#f3f2f1",  // default: "#fff"   
  bottom: '1em', // default: '32px'
  right: '1em', // default: '32px'    
  time: '0.0s', // default: '0.3s'
}

const darkmode = new Darkmode(options);
darkmode.showWidget();
console.log("darkmode: ", darkmode.isActivated())

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div className="content">
          <main>{children}</main>
          <footer className="footer">
            <small>
              Source code on <a href="https://github.com/paloranta/Treenari-source">Github</a> | <a href="https://paloranta.github.io/Workout-reminder/">In English</a>
            </small>
          </footer>
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

