import React, { Component, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import DataTable from "../../components/table/table.component";

function Users() {
	const { parent } = useParams();
	var Api = `${process.env.REACT_APP_SERVER}users/`;
	const [Error, seterror] = useState(false);
	const [loading, setloading] = useState(true);
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
			id: "Check",
			header: <input type="checkbox" name="check" />,
			cell: <input type="checkbox" name="check" />,
		},
		{
			header: "No.",
			cell: ({ row }) => {
				return row.index + 1;
			},
		},
		{
			header: "Id",
			accessorKey: "userId",
			cell: (props) => <span>#{props.getValue()}</span>,
		},
		{
			header: "Username",
			accessorKey: "username",
			cell: (props) => <span>@{props.getValue()}</span>,
		},
		{
			header: "Country",
			accessorKey: "country",
			cell: (props) => props.getValue(),
		},
		{
			header: "Registered",
			accessorKey: "created",
			cell: (props) => props.getValue(),
		},
		{
			header: "Full Name",
			accessorKey: "fullName",
			cell: (props) => props.getValue(),
		},
		{
			header: "Email",
			accessorKey: "email",
			cell: (props) => props.getValue(),
		},
		{
			header: "Phone",
			accessorKey: "phone",
			cell: (props) => props.getValue(),
		},
		{
			header: "Actions",
			accessorKey: "_id",
			cell: (props) => (
				<div className="action-col">
					<Link to={`/users/view/${props.getValue()}`}>
						<button className="abtn view">
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
			<div>
				<h1>Users</h1>

				{DataTable(data, columns)}
			</div>
		</div>
	);
}

export default Users;
