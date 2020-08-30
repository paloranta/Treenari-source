import React, { useState, useEffect } from "react";
import Aikanapit from "./Napit/Aikanapit";
import KontrolliNapit from "./Napit/Kontrollinapit";

const Ajastin = () => {
	const [ajastinPysaytetty, setAjastinPysaytetty] = useState(true);
	const [sekunnit, setSekunnit] = useState(10 * 60); // Kymmenen minuuttia 

	useEffect(() => {
		const interval = setInterval(() => {
			if (!ajastinPysaytetty) {
				setSekunnit((s) => s - 1);
			}
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	}, [ajastinPysaytetty]);

	useEffect(() => {
		if (sekunnit === 0) {
			pysayta();
			naytaIlmoitus();					
		}
	  }, [sekunnit]);

	function resetoi() {
		setSekunnit(10 * 60);
	}

	function minuutit(sekunnit) {
		return Math.floor(sekunnit/60)
	}

	function pysayta() {
		setAjastinPysaytetty(true);
	}

	function naytaIlmoitus() {
		Notification.requestPermission(function(result) {
		  if (result === "granted") {
			navigator.serviceWorker.ready.then(function(registration) {
			  registration.showNotification("Harjoitus loppui", {
				body: "Aloita seuraava harjoite",
				badge: "./icons/icon-96x96.png",
     			icon: "./icons/icon-96x96.png",
				vibrate: [200, 100, 200, 100, 200, 100, 200],				
			  });
			});
		  }
		});
	}

	function kaynnista() {
		if (sekunnit !== 0)  {
			setAjastinPysaytetty(false);
		}		
	}

	function lisaaAikaa() {
		if (ajastinPysaytetty) {
			setSekunnit(sekunnit + 60)
		}
	}

	function vahennaAikaa() {
		if (ajastinPysaytetty && sekunnit > 0) {
			if (sekunnit < 60) {
				setSekunnit(sekunnit - sekunnit)
			}
			setSekunnit(sekunnit - 60)
		}
	}

	// Lisätään nolla numeron eteen, jos se on alle tietyn pituinen
	function lisaaNolla(number) {
		if (number < 10 && number >= 0) {
			number = "0".concat(number);
		}
		return number;
	}

	return (
		<div className="centrify">
			<h2>Treeniajastin</h2>
			<div className="outer-1">
				<div className="outer">
				<h1 className="ajastin" >{(sekunnit > 0) ? lisaaNolla(minuutit(sekunnit)) + ":" + lisaaNolla(sekunnit % 60) : "00:00"}</h1>
				<Aikanapit
					vahenna={() => vahennaAikaa()}
					lisaa={() => lisaaAikaa()}
				/>
				</div>
				<KontrolliNapit
					kaynnista={() => kaynnista()}
					pysayta={() => pysayta()}
					palauta={() => resetoi()}
				/>
			</div>
		</div>
	);
}
export default Ajastin;