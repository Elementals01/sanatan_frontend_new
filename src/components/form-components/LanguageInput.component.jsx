import React, { useEffect, useState } from "react";

const LanguageInputComponent = ({
	items,
	languages,
	setLanguages,
}) => {
	useEffect(() => {
		const missingItems = items.reduce((acc, item) => {
			if (!languages[item.adminName]) {
				acc[item.adminName] = {
					checked: false,
					value: "",
				};
			}
			return acc;
		}, {});

		// Only update the state if there are missing items
		if (Object.keys(missingItems).length > 0) {
			setLanguages((prevLanguages) => ({
				...prevLanguages,
				...missingItems,
			}));
		}
	}, [items, languages, setLanguages]);

	const handleCheckboxChange = (event, adminName) => {
		setLanguages({
			...languages,
			[adminName]: {
				...languages[adminName],
				checked: event.target.checked,
			},
		});
	};

	const handleInputChange = (event, adminName) => {
		setLanguages({
			...languages,
			[adminName]: {
				...languages[adminName],
				value: event.target.value,
			},
		});
	};
	return (
		<div className="Card">
			<h1>Language Availability</h1>
			{items.map((item) => (
				<div key={item.adminName} className="drop-group">
					{" "}
					<label
						style={{
							background: languages[item.adminName]?.checked
								? "orange"
								: "transparent",
							color: languages[item.adminName]?.checked
								? "white"
								: "black",
						}}
						htmlFor={item.adminName}
						className="drop-check">
						<input
							type="checkbox"
							id={item.adminName}
							className="checkbox"
							name={item.adminName}
							checked={languages[item.adminName]?.checked || false}
							onChange={(event) =>
								handleCheckboxChange(event, item.adminName)
							}
						/>

						{item.adminName}
					</label>
					<div className="drop-col">
						<input
							type="text"
							value={languages[item.adminName]?.value || ""}
							onChange={(event) =>
								handleInputChange(event, item.adminName)
							}
						/>
					</div>
				</div>
			))}
		</div>
	);
};

export default LanguageInputComponent;
