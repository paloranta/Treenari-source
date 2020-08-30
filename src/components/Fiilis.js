import React, { useState } from "react";
import Tietovarasto from "../db/Tietovarasto";
import "./layout.css"

const Fiilis = (props) => {
	const [fiilis, setFiilis] = useState(3);
	const ajankohta = props.ajankohta;
	const tallennusID = props.id;
	const [tallennettu, setTallennettu] = useState(props.tallennettu);

	//Välitetään propsin avulla kommentti tänne parent-komponentin kautta.
	function tallennaFiilis() {
		if (ajankohta === "alku") {			
			console.log("ajankohta:", ajankohta, " fiilis:", fiilis)
			props.setAlkuFiilis(fiilis)
			if (props.kommentti.length > 0) {
				//Jos kommentti tallennettiin ennen fiilistä, tallennetaan fiilis myös idb-kommenttiin				
				let uusi = [...props.kommentti];	
				uusi.splice(2,1,fiilis);
				props.set(uusi);
				Tietovarasto.set("kommentit", tallennusID, uusi);
			}
			if (typeof window !== "undefined") {
				Tietovarasto.set("alkufiilikset", tallennusID, fiilis);
			}
		}
		if (ajankohta === "loppu") {
			console.log("ajankohta:", ajankohta, " fiilis:", fiilis)
			props.setLoppuFiilis(fiilis)
			if (props.kommentti.length > 0) {
				//Jos kommentti tallennettiin ennen fiilistä, tallennetaan fiilis myös idb-kommenttiin				
				let uusi = [...props.kommentti]
				uusi.splice(3,1,fiilis);
				props.set(uusi);			
				Tietovarasto.set("kommentit", tallennusID, uusi);						
			}
			if (typeof window !== "undefined") {
				Tietovarasto.set("loppufiilikset", tallennusID, fiilis);
			}
		}
		setTallennettu(true);
	};

	// <li  className={tallennettu ? "eiKaytossa": "nappi"}> 
	// Tämä vaihtaa nappien käytön mahdollistavien tai estävien CSS-luokkien välillä, riippuen "tallennettu"-booleanin arvosta.
	return (
		<div className="centrify">
			<ul className="fiilikset outer-5 flex-grid">
				<li className={tallennettu ? "eiKaytossa" + " col" : "nappi" + " col"}>
					<label className="smilie"><span role="img" aria-label="Hyvin surullinen">&#128551;</span>
						<input name={ajankohta} id={ajankohta + "1"} value="1" disabled={tallennettu} onChange={() => setFiilis(1)} type="radio" />
					</label>
				</li>
				<li className={tallennettu ? "eiKaytossa" + " col" : "nappi" + " col"}>
					<label className="smilie"><span role="img" aria-label="Surullinen">&#128577;</span>
						<input name={ajankohta} id={ajankohta + "2"} value="2" disabled={tallennettu} onChange={() => setFiilis(2)} type="radio" />
					</label>
				</li>
				<li className={tallennettu ? "eiKaytossa" + " col" : "nappi" + " col"}>
					<label className="smilie"><span role="img" aria-label="Neutraali">&#128528;</span>
						<input name={ajankohta} id={ajankohta + "3"} value="3" disabled={tallennettu} onChange={() => setFiilis(3)} type="radio" />
					</label>
				</li>
				<li className={tallennettu ? "eiKaytossa" + " col" : "nappi" + " col"}>
					<label className="smilie"><span role="img" aria-label="Onnellinen">&#128578;</span>
						<input name={ajankohta} id={ajankohta + "4"} value="4" disabled={tallennettu} onChange={() => setFiilis(4)} type="radio" />
					</label>
				</li>
				<li className={tallennettu ? "eiKaytossa" + " col" : "nappi" + " col"}>
					<label className="smilie"><span role="img" aria-label="Todella onnellinen">&#128516;</span>
						<input name={ajankohta} id={ajankohta + "5"} value="5" disabled={tallennettu} onChange={() => setFiilis(5)} type="radio" />
					</label>
				</li>
				<button className="nappi col" id={ajankohta + "Nappi"} disabled={tallennettu} onClick={() => tallennaFiilis()}>{tallennettu ? "✔️" : "Tallenna"}</button>
			</ul>
		</div>
	)
}

export default Fiilis; 