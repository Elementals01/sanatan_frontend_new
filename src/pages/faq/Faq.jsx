import React, { Component, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import axios from "axios";
import StatusCell from "../../components/table/status.cell";
import DataTable from "../../components/table/table.component";
import Pagefilter from "../../components/Pagefilter";

function Faqs() {
	var Api = `${process.env.REACT_APP_SERVER}faqs/faq`;
	const [Pagelist, SetPages] = useState([]);
	const [selectedRowIds, setSelectedRowIds] = useState({});
	const [keysArray, setkeysArray] = useState([]);
	const [showfilter, setfilter] = useState(false);
	const onfilterClick = () => {
		setfilter((prevIsTrue) => !prevIsTrue);
	};
	const handleSelectAll = (e) => {
		const isChecked = e.target.checked;
		const newSelectedRowIds = {};

		if (isChecked) {
			Pagelist.forEach((row) => {
				newSelectedRowIds[row._id] = true;
			});
		}
		setSelectedRowIds(newSelectedRowIds);
	};

	const handleSelectRow = (rowId) => {
		setSelectedRowIds((prev) => ({
			...prev,
			[rowId]: !prev[rowId],
		}));
	};

	useEffect(() => {
		const keyArray = Object.keys(selectedRowIds).filter(
			(key) => selectedRowIds[key] === true
		);
		setkeysArray(keyArray);
		console.log(keyArray);
	}, [selectedRowIds]);
	const columns = [
		{
			accessorKey: "_id",
			header: (
				<input
					type="checkbox"
					name="head-check"
					onChange={handleSelectAll}
					checked={
						Pagelist.length > 0 &&
						Pagelist.every((row) => selectedRowIds[row._id])
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
			header: "No.",
			sortingFn: "alphanumeric",
			cell: ({ row }) => {
				return row.index + 1;
			},
		},

		{
			header: "Faqs",
			accessorKey: "title",
			cell: (props) => ReactHtmlParser(props.getValue()),
			enableColumnFilter: true,
			filterFn: "includesString",
			sortingFn: "alphanumeric",
		},
		{
			header: "Date",
			accessorKey: "publish",
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
			cell: (props) => (
				<div className="action-col">
					<Link to={`/faq/edit/${props.getValue()}`}>
						<button className="abtn editb">
							<img src="/icons/svg/Edit.svg" />
						</button>
					</Link>

					<button
						onClick={() => handleClick(props.getValue())}
						className="abtn del">
						<img src="/icons/svg/delete.svg" />
					</button>
				</div>
			),
		},
	];
	function fetchdata() {
		try {
			axios
				.get(Api)
				.then((res) => {
					SetPages(res.data);
				})
				.catch((e) => {
					console.log(e);
				});
		} catch (error) {
			console.log(error);
		}
	}
	useEffect(() => {
		fetchdata();
	}, []);

	const [del, setdel] = useState({ cat: "", id: "" });
	const [open, setOpen] = useState(false);
	const [deleteBulk, setdeleteBulk] = useState(false);
	const handleDeleteBulk = () => {
		setdeleteBulk(true);
	};
	const handleClick = (id, cat) => {
		setOpen(true);
		setdel({ ...del, id: id, cat: cat });
	};
	const handleDialogClose = () => setOpen(false);
	const handleConfirm = () => {
		try {
			axios
				.delete(`${Api}/${del.id}`)
				.then((res) => {
					fetchdata();
				})
				.catch((error) => {});
		} catch (error) {}
		setOpen(false);
	};
	const handleBulkClose = () => setdeleteBulk(false);
	const handleBulkConfirm = () => {
		try {
			axios
				.post(`${Api}deletemany`, keysArray)
				.then((res) => {
					fetchdata();
				})
				.catch((error) => {});
		} catch (error) {}
		setdeleteBulk(false);
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
				<h1>FAQs</h1>
				{/* {Pagefilter(
					[Pagelist.length],
					fetchdata,
					fetchdata,
					fetchdata,
					fetchdata
				)} */}
				{DataTable(
					Pagelist,
					columns,
					"/faq/add",
					"+  Add New Faq",
					"title",
					() => onfilterClick()
				)}
			</div>
		</div>
	);
}

export default Faqs;
