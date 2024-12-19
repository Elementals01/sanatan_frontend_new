import React, { Component, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import DataTable from "./components/Users.table";

function Userdonation({ id }) {
	var Api = `${process.env.REACT_APP_SERVER}users/find/donations/${id}`;
	const [data, Setdata] = useState([]);

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
			header: "No.",
			cell: ({ row }) => {
				console.log("no", row, row.index);
				return row.index + 1;
			},
		},

		{
			header: "Full Name",
			accessorKey: "fullName",
			cell: (props) => props.getValue(),
		},

		{
			header: "Category",
			accessorKey: "category",
			cell: (props) => props.getValue(),
		},

		{
			header: "Amount",
			accessorKey: "amount",
			cell: (props) => props.getValue(),
		},

		{
			header: "Actions",
			accessorKey: "_id",
			cell: (props) => (
				<div className="action-col">
					<Link to={`/users/view/${props.getValue()}`}>
						<button className="abtn del">
							<img src="/icons/svg/view.svg" />
						</button>
					</Link>
				</div>
			),
		},
		// You can add more columns here if needed
	];

	return (
		<div>
			{" "}
			<div>{DataTable(data, columns, "Donation History")}</div>
		</div>
	);
}

export default Userdonation;
