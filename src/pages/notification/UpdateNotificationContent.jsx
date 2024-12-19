import React, { Component, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DescriptionComponent from "../../components/form-components/Description";
import axios from "axios";
function UpdateNotificationContent() {
	const { id, lang } = useParams();
	const navigate = useNavigate();
	var Api = `${process.env.REACT_APP_SERVER}notification/content/${id}`;
	const [IsError, seterror] = useState(false);
	const [loading, setloading] = useState(true);
	//Data Handlers

	const FormModal = {
		Name: "",
		Link: "",
		Description: "",
		Publish: "",
	};
	const [Formdata, setFormdata] = useState(FormModal);
	function fetchdata() {
		try {
			setloading(true);
			seterror(false);
			axios
				.get(Api)
				.then((res) => {
					setFormdata(res.data);
					console.log(res.data);
				})
				.catch((e) => {
					seterror(true);
				});
			setloading(false);
		} catch (error) {
			seterror(true);
			setloading(false);
		}
	}

	useEffect(() => {
		fetchdata();
	}, []);

	const inputHandler = (e) => {
		const { name, value } = e.target;
		setFormdata({ ...Formdata, [name]: value });
	};
	const HandleSubmit = async (e) => {
		e.preventDefault();
		await axios
			.put(
				`${process.env.REACT_APP_SERVER}notification/content/${id}`,
				Formdata
			)
			.then((res) => {
				console.log(res);
				navigate("/notification");
			})
			.catch((error) => console.log(error));
	};

	//Page

	return (
		<div>
			<h1>Update Notification(Content)</h1>
			<div className="Card">
				<div className="drop-group">
					<div className="drop-col">
						<span className="drop-lable">Name</span>
						<input
							type="text"
							name="Name"
							value={Formdata.Name}
							onChange={inputHandler}
						/>
					</div>
					<div className="drop-col">
						<span className="drop-lable">Publish Date</span>
						<input
							type="datetime-local"
							name="Publish"
							value={Formdata.Publish}
							onChange={inputHandler}
						/>
					</div>
				</div>

				<div className="drop-col">
					<span className="drop-lable">Link</span>
					<input
						type="text"
						value={Formdata.Link}
						onChange={inputHandler}
						name="Link"
					/>
				</div>
				{DescriptionComponent(Formdata.Description, (e) =>
					setFormdata({ ...Formdata, Description: e })
				)}
			</div>
			<div className="center">
				<button className="addButton" onClick={HandleSubmit}>
					Update Notification
				</button>
			</div>
		</div>
	);
}

export default UpdateNotificationContent;
