import React from "react";
import "./layout.css"

const Mediaani = (props) => {

    function mediaani(luvut) {
        // Jos arrayssa ei ole arvoja, palautetaan tyhjä array
        if (luvut === "undefined") {
            luvut = []
        }
        let mediaani = 0
        let lukujenMaara = luvut.length;
        // Laaditaan luvuista array
        const luvut2 = Array.from(luvut)
        luvut2.sort(); // Järjestetään arrayn luvut

        if (
            lukujenMaara % 2 === 0 // Ei jakojäännöstä kahdella jaettuna, parillinen
        ) {
            // kahden keskimmäisen luvun keskiarvo
            mediaani = (luvut2[lukujenMaara / 2 - 1] + luvut2[lukujenMaara / 2]) / 2;
        } else { // pariton luku
            // vain keskimmäinen luku, eli mediaani
            mediaani = luvut2[(lukujenMaara - 1) / 2];
        }
        // Toistetaan tähtimerkkejä mediaanin verran ⭐
        return "⭐".repeat(mediaani);
    }

    return (
        <p className={props.hetki === "alku" ? "markerheader" : "markerheader-yellow"}>{props.hetki === "alku" ? "Mediaaniolotila ennen treeniä: " : "Mediaaniolotila treenin jälkeen: "}{mediaani(props.lista)} / 5</p>        
    )
}

export default Mediaani; 