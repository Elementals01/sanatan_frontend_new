import React, { Component, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DescriptionComponent from "../../components/form-components/Description";
import axios from "axios";
function AddNew() {
	//Data handlers
	const navigate = useNavigate();
	const FormModal = {
		Title: "",
		Link: "",
		Tags: "",
		Publish: "",
	};
	const [Formdata, setFormdata] = useState(FormModal);

	const inputHandler = (e) => {
		const { name, value } = e.target;
		setFormdata({ ...Formdata, [name]: value });
	};
	const HandleSubmit = async (e) => {
		e.preventDefault();
		await axios
			.post(`${process.env.REACT_APP_SERVER}whatsnew/add`, Formdata)
			.then((res) => {
				console.log(res);
				navigate("/whatsnew");
			})
			.catch((error) => console.log(error));
	};

	//Page

	return (
		<div>
			<h1>Add What's New</h1>
			<div className="Card">
				<div className="drop-group">
					<div className="drop-col">
						<span className="drop-lable">Title</span>
						<input
							type="text"
							name="Title"
							value={Formdata.Title}
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
						name="Link"
						onChange={inputHandler}
						value={Formdata.Link}
					/>
				</div>
				<div className="drop-col">
					<span className="drop-lable">Tags</span>
					<input
						type="text"
						name="Tags"
						onChange={inputHandler}
						value={Formdata.Tags}
					/>
				</div>
			</div>
			<div className="center">
				<button className="addButton" onClick={HandleSubmit}>
					Add What's New
				</button>
			</div>
		</div>
	);
}

export default AddNew;
