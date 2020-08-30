import React, { useState, useEffect } from "react";
import Tietovarasto from "../db/Tietovarasto";
import "./layout.css"

const Treenijakso = () => {   
  const [treenipaivat, setTreenipaivat] = useState("");
  const [muistutus, setMuistutus] = useState("");
  const [aloitusPvm, setAloitusPvm] = useState("");
  const [lopetusPvm, setLopetusPvm] = useState("");

    useEffect(() => {
      if (typeof window !== "undefined") {
        Tietovarasto.get("harjoitukset", "treenipaivat").then(treenipaivat => setTreenipaivat(treenipaivat));
        Tietovarasto.get("harjoitukset", "muistutus").then(muistutus => setMuistutus(muistutus));
        Tietovarasto.get("harjoitukset", "aloitusPvm").then(pvm => setAloitusPvm(pvm.toLocaleDateString("fi")));
        Tietovarasto.get("harjoitukset", "lopetusPvm").then(pvm => setLopetusPvm(pvm.toLocaleDateString("fi")));
    }
    }, [])

    return (
        <div className="shadow-box pad col">
          <h2>Treenijakso:</h2>            
          <ul>
            <strong>{aloitusPvm}—{lopetusPvm}</strong>
            <br /><br />
            <strong>Treenipäivät</strong>:   
            <br />
            {treenipaivat}
          </ul>
          <ul>
            <strong>Muistutusaika</strong>: <br />klo {muistutus}
          </ul>
        </div>
    )
}

export default Treenijakso; 