module.exports = {
  pathPrefix: "/Treenari",
  siteMetadata: {    
    title: "Treenari",
    subtitle: "muistuttaa treeneistä",
    description: "Treenimuistutin",
    author: "@paloranta",    
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Treenari",
        short_name: "Treenari",
        background_color: "#398e3d",
        theme_color: "#4cb050",
        display: "standalone",
        start_url: "/treeni",
        icon: "src/images/treenari.png", // This path is relative to the root of the site.
        crossOrigin: "use-credentials",
      },
    },
    {
      resolve: "gatsby-plugin-no-sourcemaps",
    },
    "gatsby-plugin-offline",
   "gatsby-plugin-preact",
  ],
}
