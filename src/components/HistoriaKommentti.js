import React, { useState, useEffect } from "react"
import Tietovarasto from "../db/Tietovarasto";
import "./layout.css"
import snarkdown from "snarkdown";

const HistoriaKommentti = () => {
    const [kommentit, setKommentit] = useState([]);

    useEffect(() => {
        Tietovarasto.getAll("kommentit").then(val => setKommentit(val || []));
    }, [])

    const deleteKommentti = (sisalto, avain) => {
        let sisaltoa = sisalto;
        let filtteroity = kommentit.filter(function (sisalto) {
            return sisalto !== sisaltoa;
        });
        setKommentit(filtteroity)
        if (typeof window !== "undefined") {
            Tietovarasto.delete("kommentit", avain).then(console.log("avain " + avain + " poistettu tietokannasta"));
        }
        return console.log("kommentti poistettu ", kommentit)
    }

    const fiiliksenHymioija = (luku) => {

        switch (luku) {
            case 1:
                return "😧";
            case 2:
                return "🙁";
            case 3:
                return "😐";
            case 4:
                return "🙂";
            case 5:
                return "😄";
            default:
                return "-";
        }

    }

    return (
        <div>
            {kommentit.length > 0 &&
                <div>
                    {kommentit.slice(0).reverse().map((val) => {
                        return <div className="outer shadow-box pad"><h3>Kommentti {val[0]} <span className="hymioOtsikossa">{fiiliksenHymioija(val[2]) + " ⇒ "}{fiiliksenHymioija(val[3])}</span></h3>
                            <button onClick={() => deleteKommentti(val, val[4])} className="nappi-error">
                                ❌
            </button>
                            <p className="kommentti" dangerouslySetInnerHTML={{ __html: snarkdown(val[1].toString()) }} />

                        </div>
                    })}
                </div>}

            {kommentit.length === 0 &&
                <div className="shadow-box">
                    <h3>Ei vielä tallennettuja kommentteja</h3>
                    <p>Tallenna treenaa-välilehdellä olotilasi ja kommentit.</p>
                </div>}
        </div>
    )
}
export default HistoriaKommentti; 