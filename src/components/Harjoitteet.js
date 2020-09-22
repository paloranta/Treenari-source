import React, { useState, useEffect } from "react";
import Tietovarasto from "../db/Tietovarasto";
import "./layout.css"

const Harjoitteet = () => {
    const [harjoitukset, setHarjoitukset] = useState([]);
    const [collapse, setCollapse] = useState(true);

    useEffect(() => {
        Tietovarasto.get("harjoitukset", "treeni").then(harjoitukset => setHarjoitukset(harjoitukset || []));
    }, [])

    return (
        <div className="collapsible pad col break-all">
            <h3 className="markerheader" onClick={() => setCollapse(!collapse)}>Harjoitukset {collapse ? "+" : "-"}</h3>
            {!collapse && harjoitukset.length > 0 &&
                <ol className="space fadein">
                    {harjoitukset.map((harjoitus) => {                                       
                        return <li>  {harjoitus}</li>
                    })}

                </ol>}            
        </div>
    )
}

export default Harjoitteet;

