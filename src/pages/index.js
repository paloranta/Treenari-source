import React, { useState, useEffect } from "react"
import { document } from 'browser-monads';
import LandingBio from "../components/landing-bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Add2Home from "../components/Add2Home"
import { DateRangePickerCalendar, START_DATE } from "react-nice-dates"
import "../components/style.css"
import Tietovarasto from "../db/Tietovarasto";
import Loadable from 'react-loadable'; //Tämä tarvitaan modaleita varten, ne eivät toimi Gatsbyn kanssa hyvin.
import { fi } from 'date-fns/locale';

//Lodadable needs to be used to load the modal-components, because they're failing Gatsby build otherwise
function Loading() {
  return <div>Ladataan...</div>;
}

function loadComponent(name) {
  const Component = Loadable({
    loader: () => import(`../components/${name}.js`),
    loading: Loading,
  });
  return Component;
}

const TallennusModal = loadComponent("TallennusModal");
const TyhjennysModal = loadComponent("TyhjennysModal");

export default function Treenari() {
  // Alustetaan kalenteri ja muut
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [focus, setFocus] = useState(START_DATE);
  const [disabled, setDisabled] = useState(false);
  const [varoitus, setVaroitus] = useState(false);
  const [treeniaika, setTreeniaika] = useState();
  const [treeniPaivat, setTreenipaivat] = useState();
  const handleFocusChange = newFocus => {
    setFocus(newFocus || START_DATE)
  }

  const divs = document.querySelector("div");
  
  if (startDate !== undefined) {
    Tietovarasto.set("harjoitukset", "aloitusPvm", startDate)
  }
  if (endDate !== undefined) {
    Tietovarasto.set("harjoitukset", "lopetusPvm", endDate)
  }

  // Haetaan tämä päivä lokaalissa muodossa.
  let tanaan = new Date().toLocaleDateString("fi");

  useEffect(() => {
    //setMounted(true); // Tämä tässä, koska muuten tallennusmodal näyttää liian aikaisin
    Tietovarasto.get("harjoitukset", "aloitusPvm").then(pvm => setStartDate(pvm));
    Tietovarasto.get("harjoitukset", "lopetusPvm").then(pvm => setEndDate(pvm));
    Tietovarasto.get("harjoitukset", "treenipaivat").then(pvm => setTreenipaivat(pvm));
    Tietovarasto.get("harjoitukset", "muistutus").then(pvm => setTreeniaika(pvm));
    //Tarkistetaan tukeeko selain notification trigger APIa
    if (!("showTrigger" in Notification.prototype)) { // eslint-disable-line
      setVaroitus(true); // eslint-disable-line
    } // eslint-disable-line
  }, []);

  useEffect(() => {
    if (endDate !== undefined) {
      setDisabled(true);
    }
  }, [endDate]);

  function sisalto() {
    if (focus === "endDate") {
      return "Valitse lopetuspäivämäärä"
    } else if (focus === "startDate" && endDate === undefined) {
      return "Valitse aloituspäivämäärä"
    } else {
      return "Treenijakso tallennettu!"
    }
  }

  function haeAloituspvm() {
    return startDate;
  }

  function haeLopetuspvm() {
    return endDate;
  }

  return (
    <Layout>
      <SEO title="Treenari" keywords={[`gatsby`, `pwa`, `react`, `prototype`]} />
      <LandingBio />
      <div className="centrify">
      {varoitus ? <div className="shadow-box"><h3>Selaimesi ei tue ajastustoimintoa</h3> <p>Jos käytät Chromea, aseta <code>#enable-experimental-web-platform-features</code>-flag päälle <code>chrome://flags</code> -asetuksissa.</p></div>
      : <div className="shadow-box">
          <h2 className="markerheader">{sisalto()}</h2>
          <br/>
          {startDate === undefined && <p className="space jakso">Tänään on {tanaan}</p>}
          {startDate !== undefined && <p className="space jakso">{startDate ? startDate.toLocaleDateString("fi") : ""}—{endDate ? endDate.toLocaleDateString("fi") : ""} {treeniPaivat && <span>— treenipäivät: {treeniPaivat.toLowerCase()} — muistutus klo: {treeniaika}</span>}</p>}
          <div className={disabled ? "poisKaytosta inset" : ""}>
            <DateRangePickerCalendar
              startDate={startDate}
              endDate={endDate}
              focus={focus}
              onStartDateChange={setStartDate} // asetetaan uusi aloituspäivämäärä
              onEndDateChange={setEndDate} // asetetaan uusi lopetuspäivämäärä
              onFocusChange={handleFocusChange}
              locale={fi}
              minimumDate={new Date()}
            />
          </div>
        </div>}
        <TyhjennysModal aloituspvm={setStartDate} lopetuspvm={setEndDate} poisKaytosta={setDisabled} />
        <TallennusModal haeAloituspvm={haeAloituspvm} haeLopetuspvm={haeLopetuspvm} poisKaytosta={disabled} treeniAika={setTreeniaika} treeniPaivat={setTreenipaivat} />
        <Add2Home />       

      </div>
    </Layout>)
}
