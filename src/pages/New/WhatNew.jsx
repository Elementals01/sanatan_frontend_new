import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "../../components/table/table.component";
import ReactHtmlParser from "react-html-parser";
import axios from "axios";
function Whatsnew() {
	var Api = `${process.env.REACT_APP_SERVER}whatsnew`;
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
	async function fetchdata() {
		try {
			const res = await axios.get(Api);
			Setdata(res.data);
		} catch (error) {}
	}
	useEffect(() => {
		fetchdata();
	}, []);

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
			header: "Tags",
			accessorKey: "Tags",
			cell: (props) => ReactHtmlParser(props.getValue()),
			enableColumnFilter: true,
			filterFn: "includesString",
			sortingFn: "alphanumeric",
		},
		{
			header: "Publish Date",
			accessorKey: "publish",
			cell: (props) => props.getValue(),
			sortingFn: "datetime",
		},
		{
			header: "Actions",
			accessorKey: "_id",
			cell: (props) => (
				<div className="action-col">
					<Link to={`/herobanner/edit/${props.getValue()}`}>
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

	return (
		<div>
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

			<h1>What's New</h1>
			{DataTable(
				data,
				columns,
				"/herobanner/add",
				"+  Add What's New",
				"Title",
				() => onfilterClick()
			)}
		</div>
	);
}

export default Whatsnew;
