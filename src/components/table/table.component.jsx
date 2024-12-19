import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
	getPaginationRowModel,
	getSortedRowModel,
	getFilteredRowModel,
} from "@tanstack/react-table";

import Filters from "./Filter";
import { Link } from "react-router-dom";

const DataTable = (
	data,
	columns,
	btnlink,
	btntxt,
	searchfield,
	onFilterClick
) => {
	const [columnFilters, setColumnFilters] = useState([]);
	const table = useReactTable({
		data,
		columns,
		state: {
			columnFilters,
		},
		initialState: {
			pagination: {
				pageIndex: 0, //custom initial page index
				pageSize: 10, //custom default page size
			},

			enableSorting: true,
		},

		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	return (
		<>
			<div className="Card tablecard">
				<div className="cardhead">
					{btntxt ? (
						<Link to={btnlink}>
							<button className="addButton lg">{btntxt}</button>
						</Link>
					) : (
						<div></div>
					)}

					<Filters
						columnFilters={columnFilters}
						setColumnFilters={setColumnFilters}
						field={searchfield}
						onFilterClick={() => onFilterClick()}
						pageValue={table.getState().pagination.pageSize}
						pageSizeChange={(e) => {
							table.setPageSize(Number(e));
						}}
					/>
				</div>
				<table>
					<thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr>
								{headerGroup.headers.map((header, i) => (
									<th
										className="tablehead"
										key={i}
										onClick={
											header.column.getCanSort() &&
											header.column.getToggleSortingHandler()
										}>
										{header.column.columnDef.header}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map((row, i) => (
							<tr className="tr" key={i}>
								{row.getVisibleCells().map((cell, index) => (
									<td
										className="td"
										w={cell.column.getSize()}
										key={index}>
										{flexRender(
											cell.column.columnDef.cell,
											cell.getContext()
										)}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
				<div className="tablebottom">
					{" "}
					<div className="btn-group">
						{" "}
						<button
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								color: "black",
							}}
							className="btnoutline prevnext"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}>
							<img src="/icons/svg/table-arrow-left.svg" alt=">" />
							<span
								style={{
									color: "black",
								}}>
								{" "}
								Previous
							</span>{" "}
						</button>
						<button
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
							className="prevnext"
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}>
							<span>Next</span>
							<img src="/icons/svg/table-arrow-right.svg" alt=">" />
						</button>
					</div>
					<div>
						<span>Page</span>
						<input
							type="number"
							className="page-input"
							min={1}
							max={table.getPageCount()}
							value={table.getState().pagination.pageIndex + 1}
							onChange={(e) => {
								table.setPageIndex(Number(e.target.value - 1));
							}}
						/>

						<span> of {table.getPageCount()}</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default DataTable;
