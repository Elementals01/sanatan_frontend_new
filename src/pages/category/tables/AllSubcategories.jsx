import React, { Component, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import DataTable from "../../../components/table/table.component";
import ReactHtmlParser from "react-html-parser";
import StatusCell from "../../../components/table/status.cell";
import Pagefilter from "../../../components/Pagefilter";
function AllSubCategory() {
	const { parent } = useParams();
	var Api = `${process.env.REACT_APP_SERVER}c/categories/sub/find/${parent}`;
	const [data, Setdata] = useState([]);
	const [parentName, setParent] = useState("");

	const [countPages, setCountPages] = useState({
		all: "",
		draft: "",
		trash: "",
		published: "",
	});

	function fetchdata(query) {
		(async () => {
			try {
				const FetchApi = `${process.env.REACT_APP_SERVER}c/categories/sub/find/${parent}/type?type=${query}`;
				const response = await axios.get(FetchApi);
				const mainCategoryName = await axios.get(
					`${process.env.REACT_APP_SERVER}c/categories/main/${parent}`
				);
				Setdata(response.data.activeCategory);
				setParent(mainCategoryName.data.Name);
				setCountPages(response.data.totals);
			} catch (error) {}
		})();
	}

	useEffect(() => {
		fetchdata("");
	}, []);

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
			header: "Parent Category",
			accessorKey: parentName,
			cell: (props) => <span>{parentName}</span>,
			enableColumnFilter: true,
			filterFn: "includesString",
			sortingFn: "alphanumeric",
		},
		{
			header: "Category",
			accessorKey: "Name",
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
					<Link
						to={`/category/subcategory/edit/${props.getValue()}/${parent}`}>
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
				.delete(`${Api}${del.id}`)
				.then((res) => {
					fetchdata("");
				})
				.catch((error) => {});
		} catch (error) {}
		setOpen(false);
	};

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
			<h1>Category / Subcategory</h1>
			<Pagefilter
				counts={countPages}
				onchange={(q) => fetchdata(q)}
			/>
			{DataTable(
				data,
				columns,
				"/category/add/subcategory",
				"+  Add New Category",
				"title",
				() => onfilterClick()
			)}
		</div>
	);
}

export default AllSubCategory;
