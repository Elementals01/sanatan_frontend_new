import React, { useEffect, useState } from "react";

const LanguageDropDownComponent = ({
	items,
	languages,
	setLanguages,
	pageRedirector,
	setdefaultLanguage,
	defaultLanguage,
}) => {
	useEffect(() => {
		// Check if any item is missing from the languages state
		const missingItems = items.reduce((acc, item) => {
			if (!languages[item.adminName]) {
				acc[item.adminName] = {
					checked: false,
					value: "Not_Available",
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

	const handleLanguageChange = (e) => {
		setdefaultLanguage(e.target.value);
	};

	return (
		<div className="Card tablecard">
			<div className="drop-col">
				<span className="drop-lable">
					Select Default Language (*Required)
				</span>

				<select
					className="drop"
					value={defaultLanguage}
					onChange={handleLanguageChange}>
					<option value="">-----</option>
					{items.map((op) => (
						<option key={op.adminName} value={op.adminName}>
							{op.adminName}
						</option>
					))}
				</select>
			</div>

			{items.map((item) => (
				<div key={item.adminName} className="langtab">
					<div className="lang-name">
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
					</div>

					<div className="lang-icons">
						<div className="action-col">
							<img
								src="/icons/svg/pdficon.svg"
								alt="pdf icon"
								height={45}
							/>
							<img
								src="/icons/svg/texticon.svg"
								alt="text icon"
								height={45}
							/>
							<img
								src="/icons/svg/audioicon.svg"
								alt="audio icon"
								height={45}
							/>
							<img
								src="/icons/svg/videoicon.svg"
								alt="video icon"
								height={45}
							/>
						</div>
					</div>

					<div className="drop-col">
						<select
							value={
								languages[item.adminName]?.value || "Not_Available"
							}
							onChange={(event) =>
								handleInputChange(event, item.adminName)
							}>
							<option value="Not_Available">Not Available</option>
							<option value="Available">Available</option>
							<option value="Coming_Soon">Coming Soon</option>
						</select>
					</div>

					<div className="langbtn">
						<button
							onClick={() => pageRedirector(item.adminName)}
							className="addButton btnoutline">
							Add Content
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default LanguageDropDownComponent;
