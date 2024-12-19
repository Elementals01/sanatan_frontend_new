import React, { Component, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DescriptionComponent from "../../components/form-components/Description";
import axios from "axios";
function UpadateWhatsNew() {
	const { id } = useParams();
	var Api = `${process.env.REACT_APP_SERVER}whatsnew/${id}`;
	const [IsError, seterror] = useState(false);
	const [loading, setloading] = useState(true);
	//Data handlers
	const navigate = useNavigate();
	const FormModal = {
		Title: "",
		Link: "",
		Tags: "",
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
			.put(`${process.env.REACT_APP_SERVER}whatsnew/${id}`, Formdata)
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
					Update What's New
				</button>
			</div>
		</div>
	);
}

export default UpadateWhatsNew;
