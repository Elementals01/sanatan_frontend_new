import React, { useState } from "react";

function Pagefilter({ counts, onchange }) {
	const [selected, setSelected] = useState(1);

	const Clickevent = (id) => {
		if (id === 1) {
			setSelected(1);
			onchange("");
		} else if (id === 2) {
			setSelected(2);
			onchange("STATUS_ACTIVE");
		} else if (id === 3) {
			setSelected(3);
			onchange("STATUS_INACTIVE");
		} else if (id === 4) {
			setSelected(4);
			onchange("trash");
		}
	};
	return (
		<div>
			<div className="filter-pagetypes">
				<span
					className={selected === 1 ? "yellow" : ""}
					onClick={() => Clickevent(1)}>
					All({counts.all})
				</span>
				|
				<span
					className={selected === 2 ? "yellow" : ""}
					onClick={() => Clickevent(2)}>
					Published({counts.published})
				</span>
				|
				<span
					className={selected === 3 ? "yellow" : ""}
					onClick={() => Clickevent(3)}>
					Draft({counts.draft})
				</span>
				|
				<span
					className={selected === 4 ? "yellow" : ""}
					onClick={() => Clickevent(4)}>
					Trash(0)
				</span>
			</div>
		</div>
	);
}

export default Pagefilter;
