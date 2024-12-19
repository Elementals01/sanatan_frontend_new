import { useState } from "react";

const Filters = ({
	columnFilters,
	setColumnFilters,
	field,
	onFilterClick,
	pageValue,
	pageSizeChange,
}) => {
	const FieldName =
		columnFilters.find((f) => f.id === field)?.value || "";

	const onFilterChange = (id, value) =>
		setColumnFilters((prev) =>
			prev
				.filter((f) => f.id !== id)
				.concat({
					id,
					value,
				})
		);
	return (
		<div className="filter-group">
			<div className="blursearch" style={{ marginRight: "4px" }}>
				<input
					className="search"
					placeholder="Search"
					type="search"
					name="searchbar"
					id="searchbar"
					onChange={(e) => onFilterChange(field, e.target.value)}
				/>
				<img src="/icons/svg/search.svg" />
			</div>
			<span>Display</span>
			<select
				value={pageValue}
				onChange={(e) => {
					pageSizeChange(e.target.value);
				}}>
				{[10, 20, 30, 40, 50].map((pageSize) => (
					<option key={pageSize} value={pageSize}>
						{pageSize}
					</option>
				))}
			</select>
			<button
				className="abtn del filterbtn"
				onClick={() => onFilterClick()}>
				<img src="/icons/svg/filter.svg" />
			</button>
		</div>
	);
};
export default Filters;
