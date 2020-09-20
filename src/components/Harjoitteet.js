import React, { useState, useEffect } from "react";
import Tietovarasto from "../db/Tietovarasto";
import "./layout.css"

const Harjoitteet = () => {
    const [harjoitukset, setHarjoitukset] = useState([]);

    useEffect(() => {
        Tietovarasto.get("harjoitukset", "treeni").then(harjoitukset => setHarjoitukset(harjoitukset || []));
    }, [])

    return (
        <div className="shadow-box pad col break-all">
            <h3>Harjoitukset</h3>
            {harjoitukset.length > 0 &&
                <ol>
                    {harjoitukset.map((harjoitus) => {                                       
                        return <li>  {harjoitus}</li>
                    })}

                </ol>}
        </div>
    )
}

export default Harjoitteet;

