import React, { useState, useEffect } from "react";
import Layout from "../components/layout"
import Ajastin from "../components/Ajastin"
import SEO from "../components/seo"
import Fiilis from "../components/Fiilis"
import Kommentit from "../components/Kommentit"
import Harjoitteet from "../components/Harjoitteet";
import Treenijakso from "../components/Treenijakso";


export default function Treenaus() {
  const [tallennusID, setTallennusID] = useState("");
  const [alkufiilis, setAlkuFiilis] = useState("");       // Nämä vain kommentteihin tallennusta varten
  const [loppufiilis, setLoppuFiilis] = useState("");     // Nämä vain kommentteihin tallennusta varten
  const [kommentti, setKommentti] = useState([]);

  useEffect(() => {
    function getId() {
      const hetki = new Date();
      // valueOf()-funktio muuttaa Date-olion unix-muotoon
      const hetkiID = hetki.valueOf().toString();
      return hetkiID;
    }
    setTallennusID(getId());
  }, [])

  return (
    <Layout>
      <SEO title="Treenari" keywords={[`gatsby`, `pwa`, `react`, `prototype`]} />
      <h1 className="iso smaller">Treeni</h1>
      <div className="outer-2-tasa flex-grid">
        <Harjoitteet />
        <Treenijakso />        
      </div>
      <h2 className="centrify">Olotila ennen harjoitusta</h2>
      <Fiilis
        ajankohta="alku"
        setAlkuFiilis={setAlkuFiilis}
        id={tallennusID}
        kommentti={kommentti}
        set={setKommentti}
      />
      <div className="shadow-box space">
        <Ajastin />
      </div>
      <br />
      <div className="centrify">
        <h2 className="centrify">Olotila harjoituksen jälkeen</h2>
        <Fiilis
          ajankohta="loppu"
          setLoppuFiilis={setLoppuFiilis}
          id={tallennusID}
          kommentti={kommentti}
          set={setKommentti}
        />
      </div>
      <br />
      <h2 className="centrify">Kommentit harjoituksesta</h2>
      <div>
        <Kommentit
          id={tallennusID}
          alkufiilis={alkufiilis}
          loppufiilis={loppufiilis}
          set={setKommentti}
        />
      </div>
    </Layout>
  )
}