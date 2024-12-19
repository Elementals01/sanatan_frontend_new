import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import StatusCell from "../../components/table/status.cell";
import DataTable from "../../components/table/table.component";
import Pagefilter from "../../components/Pagefilter";
function Languages() {
	var Api = `${process.env.REACT_APP_SERVER}languages/`;
	const [datalist, Setdata] = useState([]);
	const [selectedRowIds, setSelectedRowIds] = useState({});
	const [keysArray, setkeysArray] = useState([]);

	const handleSelectAll = (e) => {
		const isChecked = e.target.checked;
		const newSelectedRowIds = {};

		if (isChecked) {
			datalist.forEach((row) => {
				newSelectedRowIds[row._id] = true;
			});
		}

		setSelectedRowIds(newSelectedRowIds);
		const keyArray = Object.keys(selectedRowIds).filter(
			(key) => selectedRowIds[key] === true
		);
		setkeysArray(keyArray);
	};

	const handleSelectRow = (rowId) => {
		setSelectedRowIds((prev) => ({
			...prev,
			[rowId]: !prev[rowId],
		}));
		const keyArray = Object.keys(selectedRowIds).filter(
			(key) => selectedRowIds[key] === true
		);
		setkeysArray(keyArray);
	};
	const columns = [
		{
			accessorKey: "_id",
			header: (
				<input
					type="checkbox"
					name="head-check"
					onChange={handleSelectAll}
					checked={
						datalist.length > 0 &&
						datalist.every((row) => selectedRowIds[row._id])
					}
				/>
			),
			cell: ({ row }) => (
				<input
					type="checkbox"
					name="checkbox"
					checked={!!selectedRowIds[row.original._id]}
					onChange={() => handleSelectRow(row.original._id)}
				/>
			),
		},
		{
			header: "id",
			cell: ({ row }) => {
				return row.index + 1;
			},
			sortingFn: "number",
		},

		{
			header: "Icon",
			accessorKey: "Icon",
			cell: (props) =>
				props.getValue() ? (
					<img
						src={props.getValue()}
						alt="icon"
						height={40}
						width={40}
					/>
				) : (
					<span>
						<strong>No Icon</strong>
					</span>
				),
		},
		{
			header: "Language",
			accessorKey: "adminName",
			cell: (props) => props.getValue(),
			enableColumnFilter: true,
			filterFn: "includesString",
			sortingFn: "alphanumeric",
		},
		{
			header: "Date",
			accessorKey: "Date",
			cell: (props) => props.getValue(),
			sortingFn: "datetime",
		},
		{
			header: "Status",
			accessorKey: "Status",
			cell: StatusCell,
		},

		{
			header: "Actions",
			accessorKey: "_id",
			enableColumnFilter: false,

			cell: (props) => (
				<div className="action-col">
					<Link to={`/languages/edit/${props.getValue()}`}>
						<button className="abtn editb">
							<img alt="" src="/icons/svg/Edit.svg" />
						</button>
					</Link>

					<button
						onClick={() => handleClick(props.getValue())}
						className="abtn del">
						<img alt="" src="/icons/svg/delete.svg" />
					</button>
				</div>
			),
		},
	];

	const [countPages, setCountPages] = useState({
		all: "",
		draft: "",
		trash: "",
		published: "",
	});
	function fetchdata(query) {
		(async () => {
			try {
				const FetchApi = `${process.env.REACT_APP_SERVER}languages/find?type=${query}`;
				const response = await axios.get(FetchApi);
				Setdata(response.data.activeLanguages);
				setCountPages(response.data.totals);
			} catch (error) {}
		})();
	}

	useEffect(() => {
		fetchdata("");
	}, []);

	const [del, setdel] = useState({ id: "" });
	const [open, setOpen] = useState(false);
	const handleClick = (id) => {
		setOpen(true);
		setdel({ ...del, id: id });
	};
	const handleDialogClose = () => setOpen(false);
	const handleConfirm = () => {
		try {
			axios
				.delete(`${Api}/${del.id}`)
				.then((res) => {
					fetchdata("");
				})
				.catch((error) => {});
		} catch (error) {}
		setOpen(false);
	};

	const [showfilter, setfilter] = useState(false);
	const [deleteBulk, setdeleteBulk] = useState(false);
	const handleDeleteBulk = () => {
		setdeleteBulk(true);
	};
	const handleBulkClose = () => setdeleteBulk(false);
	const handleBulkConfirm = () => {
		try {
			axios
				.post(`${Api}deletemany`, keysArray)
				.then((res) => {
					fetchdata("");
				})
				.catch((error) => {});
		} catch (error) {}
		setdeleteBulk(false);
	};

	const onfilterClick = () => {
		setfilter((prevIsTrue) => !prevIsTrue);
	};
	return (
		<div>
			<div>
				{open && (
					<div className="modal-del">
						<div className="warn-text">
							Are you sure you want to delete ?{" "}
						</div>
						<div className="model-btns">
							<button
								onClick={handleDialogClose}
								className="close-del">
								Close
							</button>
							<button
								onClick={(e) => handleConfirm()}
								className="modal-delbtn">
								Delete
							</button>
						</div>
					</div>
				)}
				{deleteBulk && (
					<div className="modal-del">
						<div className="warn-text">
							Are you sure you want to delete ?{" "}
						</div>
						<div className="model-btns">
							<button onClick={handleBulkClose} className="close-del">
								Close
							</button>
							<button
								onClick={(e) => handleBulkConfirm()}
								className="modal-delbtn">
								Delete
							</button>
						</div>
					</div>
				)}
				{showfilter && (
					<div className="filter">
						<strong className="yellow">Bulk Actions</strong>

						<span>
							<strong>Edit</strong>
						</span>
						<span onClick={handleDeleteBulk}>
							<strong>Move to Trash</strong>
						</span>
					</div>
				)}
				<h1>Languages</h1>
				<Pagefilter
					counts={countPages}
					onchange={(q) => fetchdata(q)}
				/>
				{DataTable(
					datalist,
					columns,
					"/languages/add",
					"+  Add New Language",
					"adminName",
					() => onfilterClick()
				)}
			</div>
		</div>
	);
}

export default Languages;
