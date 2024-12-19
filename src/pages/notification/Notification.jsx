import axios from "axios";
import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import DataTable from "../../components/table/table.component";
import Pagefilter from "../../components/Pagefilter";
function Notification() {
	var Api = `${process.env.REACT_APP_SERVER}notification`;
	const [IsError, seterror] = useState(false);
	const [loading, setloading] = useState(true);
	const [nodata, SetNodata] = useState(false);
	const [data, Setdata] = useState([]);
	const [selectedRowIds, setSelectedRowIds] = useState({});
	const [keysArray, setkeysArray] = useState([]);
	const handleSelectAll = (e) => {
		const isChecked = e.target.checked;
		const newSelectedRowIds = {};

		if (isChecked) {
			data.forEach((row) => {
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
	const [showfilter, setfilter] = useState(false);
	const onfilterClick = () => {
		setfilter((prevIsTrue) => !prevIsTrue);
	};
	useEffect(() => {
		const keyArray = Object.keys(selectedRowIds).filter(
			(key) => selectedRowIds[key] === true
		);
		setkeysArray(keyArray);
		console.log(keyArray);
	}, [selectedRowIds]);
	function fetchdata() {
		try {
			setloading(true);
			seterror(false);
			axios
				.get(Api)
				.then((res) => {
					Setdata(res.data);
					if (res.data.length === 0) {
						setloading(false);
						SetNodata(true);
					} else {
						setloading(false);
						SetNodata(false);
					}
				})
				.catch((e) => {
					setloading(false);
					seterror(true);
				});
		} catch (error) {
			seterror(true);
			setloading(false);
		}
	}
	useEffect(() => {
		fetchdata();
	}, []);
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
					fetchdata();
				})
				.catch((error) => {});
		} catch (error) {}
		setdeleteBulk(false);
	};
	// delete handler
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
					fetchdata();
				})
				.catch((error) => {});
		} catch (error) {}
		setOpen(false);
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
						data.length > 0 &&
						data.every((row) => selectedRowIds[row._id])
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
			header: "Title",
			accessorKey: "Title",
			cell: (props) => ReactHtmlParser(props.getValue()),
			enableColumnFilter: true,
			filterFn: "includesString",
			sortingFn: "alphanumeric",
		},
		{
			header: "Link",
			accessorKey: "Link",
			cell: (props) => ReactHtmlParser(props.getValue()),
			enableColumnFilter: true,
			filterFn: "includesString",
			sortingFn: "alphanumeric",
		},
		{
			header: "Description",
			accessorKey: "Description",
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
			header: "Actions",
			accessorKey: "_id",
			cell: (props) => (
				<div className="action-col">
					<Link to={`/notification/edit/${props.getValue()}`}>
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

	return (
		<div>
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

			{open && (
				<div className="modal-del">
					<div className="warn-text">
						Are you sure you want to delete ?
					</div>
					<div className="model-btns">
						<button onClick={handleDialogClose} className="close-del">
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
			<h1>Notifications</h1>
			{DataTable(
				data,
				columns,
				"/notification/add",
				"+  Add New Notification",
				"Name",
				() => onfilterClick()
			)}
		</div>
	);
}

export default Notification;
