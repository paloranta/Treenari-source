import React, { useState } from "react";
import MicroModal from "react-micro-modal"
import Tietovarasto from "../db/Tietovarasto";
import "./layout.css"

const TallennusModal = (props) => {
	const [eka, setEka] = useState("");
	const [toka, setToka] = useState("");
	const [kolmas, setKolmas] = useState("");
	const [treeniPaivat, setTreenipaivat] = useState("Maanantai, keskiviikko, perjantai");
	const [muistutusAika, setMuistutusaika] = useState();
	let harjoitteet = [];

	function viesti() {
		return "Treenijakso: " + props.haeAloituspvm().toLocaleDateString("fi") + "—" + props.haeLopetuspvm().toLocaleDateString("fi") + `
Treenipaivat: ` + treeniPaivat + `
Muistutusaika: ` + muistutusAika;
	}

	function tallennaTreeni() {
		harjoitteet.push(eka, toka, kolmas);
		Tietovarasto.set("harjoitukset", "treeni", harjoitteet);
		Tietovarasto.set("harjoitukset", "treenipaivat", treeniPaivat)
		Tietovarasto.set("harjoitukset", "muistutus", muistutusAika)
		props.treeniAika(muistutusAika); // Asetetaan parentin tietoon nämä.
		props.treeniPaivat(treeniPaivat);
		asetaMuistutus();
		harjoitteet = [];
		return console.log("harjoitteet tallennettu")
	}

	const luoMuistutus = async (body, title, muistutus) => {
		const registration = await navigator.serviceWorker.getRegistration();
		if (registration !== undefined) {
			registration.showNotification(title, {
				body: body,
				badge: "./icons/icon-96x96.png",
				icon: "./icons/icon-96x96.png",
				tag: "treenari",
				vibrate: [200, 100, 200, 100, 200, 100, 200],
				showTrigger: new TimestampTrigger(muistutus), // eslint-disable-line
			});
		}
		console.log("Muistutus luotu: ", title, body, muistutus);
	};

	function asetaMuistutus() {
		const paivat = haePaivat();
		paivat.map(paiva => luoMuistutus("Ala treenata", "Treeniaika", paiva));
		naytaIlmoitus();
	}

	function naytaIlmoitus() {
		Notification.requestPermission(function (result) {
			if (result === "granted") {
				navigator.serviceWorker.ready.then(function (registration) {
					registration.showNotification("Muistutukset asetettu", {
						body: viesti(),
						badge: "./icons/icon-96x96.png",
						icon: "./icons/icon-96x96.png",
						vibrate: [200, 100, 200, 100, 200, 100, 200],
						data: {
							url: "https://paloranta.github.io/Treenari/treeni/"
						}
					});
				});
			}
		});
		console.log(viesti());
	}

	function haePaivat() {
		let alku = props.haeAloituspvm();
		let loppu = props.haeLopetuspvm();
		if (loppu === undefined) {
			loppu = new Date();
		}
		let current = new Date(alku);
		current.setHours(muistutusAika.split(":")[0])
		current.setMinutes(muistutusAika.split(":")[1]) // Asetetaan muistutus oikeaan aikaan valitun perusteella.
		let end = new Date(loppu);
		end.setHours(muistutusAika.split(":")[0])
		end.setMinutes(muistutusAika.split(":")[1])
		let result = [];
		while (current <= end) {
			if (treeniPaivat === "Tiistai, torstai, lauantai") { // Tsekataan ettei päivä ole ei-haluttu
				if (current.getDay() === 2 || current.getDay() === 4 || current.getDay() === 6) {
					result.push(new Date(current));
				}
			} else if ((treeniPaivat === "Maanantai, keskiviikko, perjantai")) { // Tsekataan ettei päivä ole ei-haluttu
				if (current.getDay() === 1 || current.getDay() === 3 || current.getDay() === 5) {
					result.push(new Date(current));
				}
			} else {
				result.push(new Date(current));
			}
			current.setDate(current.getDate() + 1)
		}
		return result;
	}

	return (
		<MicroModal
			closeOnAnimationEnd={true}
			trigger={handleOpen => <button className={props.poisKaytosta ? "nappi space" : "eiKaytossa space"} onClick={handleOpen}>{props.poisKaytosta ? "Harjoitteet ja muistutus" : "Valitse treenijakso"}</button>}
			children={handleClose => <div>
				<h1>Harjoitteet ja muistutusaika</h1>
				<p>Kirjoita harjoitteet ja muistutusaika. Tallentaminen ylikirjoittaa vanhat tiedot.</p>
				<div className="outer-1">
					<textarea cols="112" maxLength="320" onChange={(e) => setEka(e.target.value)} id="eka" name="eka" type="text" placeholder="Harjoite 1 - Lyhyt kuvaus harjoitteesta" required />
					<textarea cols="112" maxLength="320" onChange={(e) => setToka(e.target.value)} id="toka" name="eka" type="text" placeholder="Harjoite 2 - Lyhyt kuvaus harjoitteesta" required />
					<textarea cols="112" maxLength="320" onChange={(e) => setKolmas(e.target.value)} id="kolmas" name="eka" type="text" placeholder="Harjoite 3 - Lyhyt kuvaus harjoitteesta" required />
				</div>
				<div className="outer-1 space">
					<label>Treenipäivät</label>
					<select onChange={(e) => setTreenipaivat(e.target.value)} value={treeniPaivat} id="treenipv" name="treenipv" required>
						<option value="Maanantai, keskiviikko, perjantai">Maanantai, keskiviikko, perjantai</option>
						<option value="Tiistai, torstai, lauantai">Tiistai, torstai, lauantai</option>
						<option value="Joka päivä">Joka päivä</option>
					</select>
					<label>Muistutus</label>
					<input onChange={(e) => setMuistutusaika(e.target.value)} value={muistutusAika} type="time" id="muistutus" name="muistutus" min="00:00" max="23:59" step={60 * 15} required>

					</input>

				</div>
				<div className="space">
					<button id="peruuta" className="nappi-error" name="peruuta" onClick={handleClose}>Peruuta</button>
					<button id="tallenna" name="tallenna" className={muistutusAika && treeniPaivat ? "nappi" : "eiKaytossa"} type="" onMouseDown={() => tallennaTreeni()} onClick={handleClose}>{muistutusAika && treeniPaivat ? "Tallenna" : "Täytä kaikki kentät"}</button>
				</div>

			</div>
			} />
	)
}

export default TallennusModal; 