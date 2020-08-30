import React from "react"
import { StaticQuery, graphql } from "gatsby"
import "./layout.css"

const LandingBio = () => (
  <StaticQuery
    query={graphql`
      query LandingSiteTitleQuery {
        site {
          siteMetadata {
            title
            subtitle
          }
        }
      }
    `}
    render={data => (
     <div className="container">
       <h1 className="nameheader">Treenari</h1>
       <p className="description">muistuttaa treeneistä</p>
     </div>
    )}
  />
)

export default LandingBio