import React, { useState, useEffect } from "react"
import Trend from "react-trend";
import Layout from "../components/layout"
import SEO from "../components/seo"
import Mediaani from "../components/Mediaani"
import HistoriaKommentti from "../components/HistoriaKommentti"
import Tietovarasto from "../db/Tietovarasto";

export default function Historia() {
  const [alkufiilisArvot, setAlkufiilisArvot] = useState([]);
  const [loppufiilisArvot, setLoppufiilisArvot] = useState([]);
  let alkufiilisNumerot = alkufiilisArvot.map(Number);
  let loppufiilisNumerot = loppufiilisArvot.map(Number);

  useEffect(() => {
    Tietovarasto.getAll("alkufiilikset").then(val => setAlkufiilisArvot(val || []));
    Tietovarasto.getAll("loppufiilikset").then(val => setLoppufiilisArvot(val || []));
  }, [])

  // Näytetään 30 viimeisintä tulosta viivakuvaajassa
  if (loppufiilisNumerot.length > 29) {
    loppufiilisNumerot = loppufiilisNumerot.slice(Math.max(loppufiilisNumerot.length - 30, 0))
  }
  if (alkufiilisNumerot.length > 29) {
    alkufiilisNumerot = alkufiilisNumerot.slice(Math.max(alkufiilisNumerot.length - 30, 0))
  }

  return (
    <Layout>
      <SEO title="Historia" keywords={[`gatsby`, `application`, `react`]} />
      <h1 className="iso">Treenihistoria</h1>

      <div className="outer-grid grow">
        <div>
          {Array.isArray(alkufiilisNumerot) && alkufiilisNumerot.length > 1 && <Trend
            smooth
            autoDraw
            autoDrawDuration={1000}
            autoDrawEasing="ease-out"
            data={alkufiilisNumerot}
            gradient={["#4cb050"]}
            radius={20}
            strokeWidth={3}
            strokeLinecap={"round"}
          />}
        </div>
        <div>
          {Array.isArray(loppufiilisNumerot) && loppufiilisNumerot.length > 1 && <Trend
            smooth
            autoDraw
            autoDrawDuration={1000}
            autoDrawEasing="ease-out"
            data={loppufiilisNumerot}
            gradient={["yellow"]}
            radius={20}
            strokeWidth={3}
            strokeLinecap={"round"}
          />}
        </div>
      </div>
      <br />
      <div className="outer-1-1 grow">
        <Mediaani lista={alkufiilisNumerot} hetki={"alku"} />
        <Mediaani lista={loppufiilisNumerot} hetki={"loppu"} />
      </div>
      <HistoriaKommentti />

    </Layout>)
}