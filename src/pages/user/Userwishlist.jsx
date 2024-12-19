import React, { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import axios from "axios";
import DataTable from "./components/Users.table";

function Userwishlist({ id }) {
	var Api = `${process.env.REACT_APP_SERVER}users/find/wishlist/${id}`;
	const [data, Setdata] = useState([]);

	async function fetchdata() {
		try {
			const res = await axios.get(Api);

			Setdata(res.data);
		} catch (error) { }
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
			cell: (props) => (
				<span
					style={{
						fontWeight: "bold",
						fontSize: "14px",
						fontFamily: "Lato",
					}}>
					{ReactHtmlParser(props.getValue())}
				</span>
			),
		},

		{
			header: "Category",
			accessorKey: "category",
			cell: (props) => props.getValue(),
		},

		// You can add more columns here if needed
	];

	return (
		<div>
			{" "}
			<div>{DataTable(data, columns, "Wishlist")}</div>
		</div>
	);
}

export default Userwishlist;
