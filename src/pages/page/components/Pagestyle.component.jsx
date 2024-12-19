import React from "react";
import { useNavigate } from "react-router-dom";

function Pagestylecomponent({ page }) {
	const navigate = useNavigate();
	const handleChange = (e) => {
		var value = e.target.value;
		console.log(value);
		if (value === "scriptures") {
			navigate("/pages/scriptures/add/");
		}
		if (value === "temples") {
			navigate("/pages/temples/add/");
		}
		if (value === "aarti") {
			navigate("/pages/aarti/add/");
		}
		if (value === "extrapages") {
			navigate("/pages/extrapages/add/");
		}
		if (value === "blog") {
			navigate("/pages/blog/add/");
		}
	};
	return (
		<>
			<div className="drop-col">
				{" "}
				<span className="drop-lable">Select Page Style</span>
				<select
					className="drop"
					value={page}
					name="Pagestyle"
					onChange={handleChange}>
					<option value="scriptures">
						Page Style 1 (Scriptures)
					</option>
					<option value="aarti">Page Style 2 (Aarti)</option>
					<option value="temples">Page Style 3 (Temple)</option>
					<option value="extrapages">Page Style 4 (Extra)</option>
					<option value="blog">Page Style 5 (Blogs)</option>
				</select>
			</div>
		</>
	);
}

export default Pagestylecomponent;
