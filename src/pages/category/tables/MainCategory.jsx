import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DataTable from "../../../components/table/table.component";
import ReactHtmlParser from "react-html-parser";
import StatusCell from "../../../components/table/status.cell";
import Pagefilter from "../../../components/Pagefilter";
import { ToastContainer } from "react-toastify";
function MainCategory() {
	var Api = `${process.env.REACT_APP_SERVER}c/categories/main/`;
	const [data, Setdata] = useState([]);
	const [countPages, setCountPages] = useState({
		all: "",
		draft: "",
		trash: "",
		published: "",
	});
	function fetchdata(query) {
		(async () => {
			try {
				const FetchApi = `${process.env.REACT_APP_SERVER}c/categories/main/find?type=${query}`;
				const response = await axios.get(FetchApi);
				console.log(response.data);
				Setdata(response.data.activeCategory);
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
			header: "Category In",
			accessorKey: "CategoryIn",
			cell: (props) => ReactHtmlParser(props.getValue()),
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
			header: "Sub Category",
			accessorKey: "subcategoriesCount",
			cell: (props) => ReactHtmlParser(props.getValue()),
			enableColumnFilter: true,
			filterFn: "includesString",
			sortingFn: "alphanumeric",
		},
		{
			header: "Inner Category",
			accessorKey: "innercategoriesCount",
			cell: (props) => ReactHtmlParser(props.getValue()),
			enableColumnFilter: true,
			filterFn: "includesString",
			sortingFn: "alphanumeric",
		},
		{
			header: "Color",
			accessorKey: "linearcolor",
			cell: (props) => (
				<div
					style={{
						width: "61px",
						height: "32px",
						borderRadius: "100px",
						background: `linear-gradient(${props.getValue()})`,
					}}>
					{" "}
				</div>
			),
		},

		{
			header: "",
			accessorKey: "_id",
			cell: (props) => (
				<Link to={`/category/subcategory/${props.getValue()}`}>
					<button
						className="viewbtn"
						style={{ maxWidth: "max-content" }}>
						View Sub Category
					</button>
				</Link>
			),
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
					<Link to={`/category/edit/${props.getValue()}`}>
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
			<div style={{ display: "flex", alignItems: "center" }}>
				<Pagefilter
					counts={countPages}
					onchange={(q) => fetchdata(q)}
				/>
				<Link
					style={{
						textDecoration: "none",
						marginLeft: "-15px",
						marginRight: "10px",
						color: "black",
					}}>
					{"| View all Sub categories"}
				</Link>
				<Link style={{ textDecoration: "none", color: "black" }}>
					{"	| View all Inner categories"}
				</Link>
			</div>
			{DataTable(
				data,
				columns,
				"/category/add/main",
				"+  Add New Category",
				"Name",
				() => onfilterClick()
			)}
			<ToastContainer />
		</div>
	);
}

export default MainCategory;
