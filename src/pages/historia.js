import React, { useState, useEffect } from "react"
import Trend from "react-trend";
import Layout from "../components/layout"
import SEO from "../components/seo"
import Mediaani from "../components/Mediaani"
import HistoriaKommentti from "../components/HistoriaKommentti"
import Tietovarasto from "../db/Tietovarasto";
import IDBExportImport from "indexeddb-export-import";

export default function Historia() {
  const [alkufiilisArvot, setAlkufiilisArvot] = useState([]);
  const [loppufiilisArvot, setLoppufiilisArvot] = useState([]);
  const [naytaOsio, setNaytaOsio] = useState(false);
  let alkufiilisNumerot = alkufiilisArvot.map(Number);
  let loppufiilisNumerot = loppufiilisArvot.map(Number);
  let database;
  if (typeof window !== `undefined`) {
    let DBOpenRequest = window.indexedDB.open("Treenari", 1);
    DBOpenRequest.onsuccess = function () {
      database = DBOpenRequest.result;
      console.log(database);
    };
  } 

  useEffect(() => {
    Tietovarasto.getAll("alkufiilikset").then(val => setAlkufiilisArvot(val || []));
    Tietovarasto.getAll("loppufiilikset").then(val => setLoppufiilisArvot(val || []));
  }, [])

  function download(filename) {
    if (typeof window !== `undefined`) {
      IDBExportImport.exportToJsonString(database, function (err, jsonString) {
        if (err) {
          console.error(err);
        } else {
          console.log("Exportoitu JSON: ", encodeURIComponent(jsonString));
          let linkki = document.createElement("a");
          linkki.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(jsonString));
          linkki.setAttribute("download", filename);

          if (document.createEvent) {
            var event = document.createEvent("MouseEvents");
            event.initEvent("click", true, true);
            linkki.dispatchEvent(event);
          }
          else {
            linkki.click();
          }
        }
      })
    } else {
      return console.log(filename)
    }
  }

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
    <h1 className="iso make-smaller">Treenihistoria</h1>

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
          style={"height:auto"}
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
          style={"height:auto"}
        />}
      </div>
    </div>
    <br />
    <div className="outer-1-1 grow">
      <Mediaani lista={alkufiilisNumerot} hetki={"alku"} />
      <Mediaani lista={loppufiilisNumerot} hetki={"loppu"} />
    </div>
    <div className="collapsible pad">
      <h3 className="markerheader" onClick={() => setNaytaOsio(!naytaOsio)}>Vie tietokanta tiedostoon  {naytaOsio ? "-" : "+"}</h3>
      {naytaOsio && <div className="outer-2-tasa flex-grid fadein space">
        <div className="shadow-box-green pad col centrify" onClick={() => download("treenari.json")}>
          Vie sisältö tiedostoon
          </div>
        <div className="shadow-box pad col dropzone" id="dropzone">
          Tuominen ei vielä toimi
        </div>
      </div>}
    </div>

    <HistoriaKommentti />

  </Layout>)
}