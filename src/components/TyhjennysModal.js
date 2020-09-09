import React from "react";
import MicroModal from "react-micro-modal"
import Tietovarasto from "../db/Tietovarasto";
import "./layout.css"

const TyhjennysModal = (props) => {

	const poistaMuistutukset = async (tag) => {
		const registration = await navigator.serviceWorker.getRegistration();
		if (registration !== undefined) {
			const notifications = await registration.getNotifications({ tag: tag, includeTriggered: true, });
			notifications.forEach((notification) => notification.close());
			console.log("Muistutukset poistettu")
		}
	};

	// IndexedDb:n ja muistutusten tyhjennysfunktio

	function tyhjenna() {
		if (typeof window !== "undefined") {
			Tietovarasto.delete("harjoitukset", "aloitusPvm");
			Tietovarasto.delete("harjoitukset", "lopetusPvm");
			Tietovarasto.delete("harjoitukset", "muistutus");
			Tietovarasto.delete("harjoitukset", "treeni");
			Tietovarasto.delete("harjoitukset", "treenipaivat");
			props.aloituspvm();
			props.lopetuspvm();
			props.poisKaytosta(false);
			if ("serviceWorker" in navigator) {
				poistaMuistutukset("treenari");
				naytaIlmoitus();
				console.log("Muistutukset poistettu.");
			}
		}
		console.log("Treenijakso tyhjennetty.");
	}

	function naytaIlmoitus() {
		Notification.requestPermission(function(result) {
		  if (result === "granted") {
			navigator.serviceWorker.ready.then(function(registration) {
			  registration.showNotification("Muistutukset poistettu", {
				body: "Aseta uudet tiedot",
				badge: "./icons/icon-96x96.png",
     			icon: "./icons/icon-96x96.png",
				vibrate: [200, 100, 200, 100, 200, 100, 200],				
			  });
			});
		  }
		});
	}

	return (
		<MicroModal
			closeOnAnimationEnd={true}
			trigger={handleOpen => <button className={props.eiKaytossa ? "eiKaytossa space": "nappi-error space"} onClick={handleOpen}>Tyhjennä kalenteri</button>}
			children={handleClose => <div><strong>Tyhjennys poistaa treenijakson ja poistaa muistutukset</strong><br /><button onClick={handleClose}>Peruuta</button><button className="nappi-error" onMouseDown={() => tyhjenna()} onClick={handleClose}>Varmista tyhjennys</button></div>}
		/>
	)
}

export default TyhjennysModal; 