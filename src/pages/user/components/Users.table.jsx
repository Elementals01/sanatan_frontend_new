import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import "../../../css/user/user.css";
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
	getPaginationRowModel,
	getSortedRowModel,
	getFilteredRowModel,
} from "@tanstack/react-table";

import Filters from "../../../components/table/Filter";
import { Link } from "react-router-dom";

const DataTable = (data, columns, tabletitle, onFilterClick) => {
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

	console.log(table.getHeaderGroups());
	return (
		<>
			<div className="card-700">
				<div className="cardhead">
					<h1>{tabletitle}</h1>

					<Filters
						columnFilters={columnFilters}
						setColumnFilters={setColumnFilters}
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
								{headerGroup.headers.map((header) => (
									<th className="tablehead">
										{header.column.columnDef.header}
										{header.column.getCanSort() && (
											<FontAwesomeIcon
												icon={faSort}
												onClick={header.column.getToggleSortingHandler()}
											/>
										)}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map((row, i) => (
							<tr className="tr" key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<td
										className="td"
										w={cell.column.getSize()}
										key={cell.id}>
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
							className="btnoutline prevnext"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}>
							Previous
						</button>
						<button
							className="prevnext"
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}>
							Next
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
