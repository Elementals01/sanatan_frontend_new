import React from "react";

function Categorycomponent({
	onchange,
	onchange2,
	value1,
	value2,
	categories,
	subcategories,
}) {
	return (
		<>
			<div className="drop-col">
				<span className="drop-lable">Select Category</span>
				<select
					className="drop"
					name="Category"
					value={value1}
					onChange={(e) => onchange(e)}>
					<option value="">------</option>
					{categories.map((op, index) => {
						return <option value={op._id}>{op.Name}</option>;
					})}
				</select>
			</div>
			<div className="drop-col">
				<span className="drop-lable">Select Sub Category</span>
				<select
					className="drop"
					onChange={onchange2}
					value={value2}
					name="Subcategory">
					<option value="">------</option>
					{subcategories.map((op, index) => {
						return <option value={op._id}>{op.Name}</option>;
					})}
				</select>
			</div>
		</>
	);
}

export default Categorycomponent;
