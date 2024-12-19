import React, { Component, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import DataTable from "./components/Users.table";

function Usercollection({ id }) {
	var Api = `${process.env.REACT_APP_SERVER}users/find/collections/${id}`;
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
			header: "Name",
			accessorKey: "itemName",
			cell: (props) => props.getValue(),
		},

		{
			header: "Category",
			accessorKey: "category",
			cell: (props) => props.getValue(),
		},

		{
			header: "Status",
			accessorKey: "status",
			cell: (props) => props.getValue(),
		},

		// You can add more columns here if needed
	];

	return (
		<div>
			{" "}
			<div>{DataTable(data, columns, "Collections")}</div>
		</div>
	);
}

export default Usercollection;
