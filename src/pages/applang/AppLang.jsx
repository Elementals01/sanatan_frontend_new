import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import StatusCell from "../../components/table/status.cell";
import DataTable from "../../components/table/table.component";
import Pagefilter from "../../components/Pagefilter";
function AppLanguages() {
	const [countPages, setCountPages] = useState({
		all: "",
		draft: "",
		trash: "",
		published: "",
	});
	function fetchdata(query) {
		(async () => {
			try {
				const FetchApi = `${process.env.REACT_APP_SERVER}applanguages/find?type=${query}`;
				axios
					.get(FetchApi)
					.then((response) => {
						Setdata(response.data.activeLanguages);
						setCountPages(response.data.totals);
						console.log(response);
					})
					.catch((e) => {});
			} catch (error) {}
		})();
	}

	useEffect(() => {
		fetchdata("");
	}, []);

	const columns = [
		{
			id: "Check",
			header: <input type="checkbox" name="check" />,
			cell: <input type="checkbox" name="check" />,
		},
		{
			header: "id",
			cell: ({ row }) => {
				console.log("no", row, row.index);
				return row.index + 1;
			},
		},
		{
			header: "Admin Title",
			accessorKey: "adminName",
			cell: (props) => props.getValue(),
			enableColumnFilter: true,
			filterFn: "includesString",
		},
		{
			header: "Icon",
			accessorKey: "Icon",
			cell: (props) => (
				<img
					src={props.getValue()}
					alt="icon"
					srcset=""
					height={40}
					width={40}
				/>
			),
		},
		{
			header: "Name",
			accessorKey: "Name",
			cell: (props) => props.getValue(),
			enableColumnFilter: true,
			filterFn: "includesString",
		},
		{
			header: "Date",
			accessorKey: "Date",
			cell: (props) => props.getValue(),
		},
		{
			header: "Code",
			accessorKey: "Code",
			cell: (props) => props.getValue(),
		},
		{
			header: "Direction",
			accessorKey: "textDirection",
			cell: (props) => props.getValue(),
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
					<Link to={`/applanguages/edit/${props.getValue()}`}>
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

	var Api = `${process.env.REACT_APP_SERVER}applanguages/`;

	const [datalist, Setdata] = useState([]);
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

	return (
		<div>
			{open && (
				<div className="modal-del">
					<div className="warn-text">
						Are you sure you want to delete ?{" "}
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
			<h1>App Languages</h1>
			<Pagefilter
				counts={countPages}
				onchange={(q) => fetchdata(q)}
			/>
			{DataTable(
				datalist,
				columns,
				"/applanguages/add",
				"+  Add New Language",
				"adminName"
			)}
		</div>
	);
}

export default AppLanguages;
