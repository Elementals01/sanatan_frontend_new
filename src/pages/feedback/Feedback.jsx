import React, { Component, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import DataTable from "../../components/table/table.component";

function FeedBack() {
	const { parent } = useParams();
	var Api = `${process.env.REACT_APP_SERVER}feedbacks/`;
	const [Error, seterror] = useState(false);
	const [loading, setloading] = useState(true);
	const [data, Setdata] = useState([]);
	const [nodata, SetNodata] = useState(false);

	async function fetchdata() {
		try {
			setloading(true);
			seterror(false);
			const res = await axios.get(Api);
			console.log(res);

			Setdata(res.data);
			if (res.data.length === 0) {
				setloading(false);
				SetNodata(true);
			} else {
				setloading(false);
				SetNodata(false);
			}
		} catch (error) {
			seterror(true);
			setloading(false);
		}
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
			header: "Email",
			accessorKey: "email",
			cell: (props) => props.getValue(),
		},
		{
			header: "Subject",
			accessorKey: "subject",
			cell: (props) => props.getValue(),
		},
		{
			header: "Description",
			accessorKey: "feedback",
			cell: (props) => props.getValue(),
		},
		{
			header: "Date",
			accessorKey: "createdAt",
			cell: (props) => props.getValue(),
		},
		{
			header: "Actions",
			accessorKey: "_id",
			cell: (props) => (
				<div className="action-col">
					<Link to={`/feedback/${props.getValue()}`}>
						<button className="abtn del">
							<img src="/icons/svg/view.svg" />
						</button>
					</Link>
				</div>
			),
		},
		// You can add more columns here if needed
	];

	if (Error === true) {
		<div className="errormsg">
			<h4>Unexpected Server Error</h4>
		</div>;
	}
	if (loading === true) {
		<div>
			<span className="loader"></span>
		</div>;
	}

	return (
		<div>
			{" "}
			<div>
				<h1>FeedBack</h1>

				{DataTable(data, columns)}
			</div>
		</div>
	);
}

export default FeedBack;
