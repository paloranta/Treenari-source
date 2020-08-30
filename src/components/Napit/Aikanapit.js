import React from "react";

export default function AikaNapit(props) {

	return (
		<div>
			<button className="nappi" onClick={props.lisaa}>
				➕
				</button>
			<button className="nappi-error" onClick={props.vahenna}>
				➖
				</button>
		</div>
	);
}