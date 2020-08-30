import React, { useState, useEffect } from "react";
import "./layout.css"
import Tietovarasto from "../db/Tietovarasto";
import snarkdown from "snarkdown"

const Kommentit = (props) => {

  const [kommentti, setKommentti] = useState("");
  const [kommentit, setKommentit] = useState(["Ei kommentteja"]);
  const [tallennettu, setTallennettu] = useState(false);
  const alku = props.alkufiilis;
  const loppu = props.loppufiilis;
  const tallennusID = props.id;

  useEffect(() => {
    Tietovarasto.get("kommentit", "kommentit").then(kommentit => setKommentit(kommentit || []));
  }, [])

  function saveKommentti(sisalto) {
    //Jos olotilat on valittu, tallennetaan ne kommentin yhteyteen
    let alkutallennettava = alku;
    let lopputallennettava = loppu;

    if (!alkutallennettava || 0 === alkutallennettava.length) {
      alkutallennettava = "-";
    }
    if (!lopputallennettava || 0 === lopputallennettava.length) {
      lopputallennettava = "-";
    }
    //Kommentille päivämäärä ja aika
    const pvm = new Date();
    const jsonPvm = pvm.toLocaleDateString("fi-FI");
    const jsonTime = pvm.toLocaleTimeString("sv-SV"); //  H:mm:ss, fi-FI: H.mm.ss
    const jsonTimeEisekunteja = jsonTime.slice(0, -3);
    const aika = jsonPvm + ", kello " + jsonTimeEisekunteja;

    //Tallennetaan kommentti
    kommentit.push(aika, sisalto, alkutallennettava, lopputallennettava, tallennusID);
    const newKommentit = [...kommentit]  // Tällä tehdään uusi array vanhasta
    setKommentit(newKommentit)
    if (typeof window !== "undefined") {
      Tietovarasto.set("kommentit", tallennusID, newKommentit);
    }
    props.set(newKommentit) // Välitetään tieto parent- ja sisaruskomponenteille
    setKommentti(""); //Tämä tyhjentää tekstikentän
    setTallennettu(true); //Tämä disabloi teketikentän ja tallennusnapin
    return console.log("kommentti tallennettu ", kommentit)
  }

  function deleteKommentti(avain) {
    setKommentit([]);
    if (typeof window !== "undefined") {
      Tietovarasto.delete("kommentit", avain);
    }    
    setTallennettu(false);
    return console.log("kommentti poistettu ", kommentit)
  }

  function updateInput(value) {
    setKommentti(value);
  }

  return (
    <>
      <div className="outer-2">
        <textarea
          aria-label="Kirjoita kommentti"
          id="in"
          type="text"
          placeholder="**Markdown**-syntaksi [tuettu]."
          value={kommentti}
          onChange={e => updateInput(e.target.value)}
          className="inset-shadow"
          disabled={tallennettu}
        />
        <button
          className="nappi"
          onClick={() => saveKommentti(kommentti)}
          disabled={!kommentti.length || tallennettu}
        >
          ➕
        </button>
        <div
          dangerouslySetInnerHTML={{ __html: snarkdown(kommentti.toString()) }} className="inset-shadow height-3"
        />
      </div>
      <br />
      {Array.isArray(kommentit) && kommentit.length > 1 && //Tarkistetaan onko kommentti validi
        <div className="outer shadow-box pad">
          <h3>{kommentit[0]}</h3>
          <button onClick={() => deleteKommentti(kommentit[4])} className="nappi-error">
            ❌
          </button>
          <p dangerouslySetInnerHTML=
            {{ __html: snarkdown(Array.isArray(kommentit) && kommentit.length > 1 && kommentit[1].toString().replace(/^"(.*)"$/, "$1")) }}>
          </p>
        </div>}
    </>
  )
}

export default Kommentit; 