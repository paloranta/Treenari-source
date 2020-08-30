import React from "react";

export default function Kontrollinapit(props) {

	return (
		<div data-toggle="buttons">
			<button className="nappi" onClick={props.kaynnista}>
				Käynnistä ▶
				</button>
			<button className="nappi-error" onClick={props.pysayta}>
				Pysäytä 🛑
				</button>
			<button className="nappi-error" onClick={props.palauta}>
				Palauta 🚫
				</button>
		</div>
	);
}