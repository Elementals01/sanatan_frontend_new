import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
function Invoices() {
	var Api = `${process.env.REACT_APP_SERVER}invoices`;
	const [IsError, seterror] = useState(false);
	const [loading, setloading] = useState(true);
	const [nodata, SetNodata] = useState(false);
	const [data, Setdata] = useState();

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

	if (loading) {
		return (
			<div>
				<span className="loader"></span>
			</div>
		);
	}
	if (IsError) {
		return (
			<div className="center">
				<h4>Unexpected Server Error</h4>
			</div>
		);
	}

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
			<h1>Invoices</h1>
			<div className="Card tablecard">
				<div className="cardhead">
					<div></div>
					<div className="filters f-right">
						<input
							className="search"
							placeholder="Search"
							type="search"
							name="searchbar"
							id="searchbar"
						/>{" "}
						<div>
							<span>Display</span>
							<select name="pageqty" id="pageqty">
								<option value="1">10</option>
							</select>
						</div>{" "}
						<button className="abtn del"></button>
					</div>
				</div>
				<div className="card-table">
					<table className="table">
						<thead>
							<tr className="tablehead">
								<th className="tablehead">
									<input type="checkbox" />
								</th>
								<th className="tablehead">No.</th>
								<th className="tablehead">Name</th>
								<th className="tablehead">Donation for</th>
								<th className="tablehead">Donation Category</th>
								<th className="tablehead">Amount</th>
								<th className="tablehead">Date</th>
								<th className="tablehead">View</th>
								<th className="tablehead">Actions</th>
							</tr>
						</thead>
						<tbody>
							{nodata == true ? (
								<></>
							) : (
								data.map((rowdata, index) => {
									return (
										<tr>
											<td>
												<input type="checkbox" name="table-check" />
											</td>
											<td>{index + 1}</td>
											<td>{rowdata.Name}</td>
											<td>{rowdata.Link}</td>
											<td>{rowdata.Description}</td>
											<td>{rowdata.Publish}</td>

											<td>
												{" "}
												<div className="action-col">
													<Link to={`/invoices/view/${rowdata._id}`}>
														<button className="abtn editb">
															<img src="/icons/svg/Edit.svg" />
														</button>
													</Link>
												</div>
											</td>
										</tr>
									);
								})
							)}
						</tbody>
					</table>
					{data.length > 10 && (
						<div className="tablebottom">
							{" "}
							<div className="btn-group">
								{" "}
								<button className="btnoutline prevnext">
									Previous
								</button>
								<button className="prevnext">Next</button>
							</div>
							<div>
								<span>Page</span>
								<select name="pageqty" id="pageqty">
									<option value="1">1</option>
								</select>
								<span> of 1</span>
							</div>
						</div>
					)}
					{nodata && (
						<div className="center nodatamsg">
							<span>No Invoices to show</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Invoices;
