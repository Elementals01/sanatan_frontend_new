import axios from "axios";
import moment from "moment";
import React, { Component, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FileInputComponent from "../file-manager/components/FileInputComponent";

function AppLanguageUpdate() {
	const navigate = useNavigate();
	const { id } = useParams();
	var Api = `${process.env.REACT_APP_SERVER}applanguages/${id}`;
	const [Error, seterror] = useState(false);
	const [loading, setloading] = useState(false);
	function fetchdata() {
		try {
			setloading(true);
			seterror(false);
			axios
				.get(Api)
				.then((res) => {
					setlanguage(res.data);
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
	const languagemodel = {
		adminName: "",
		Name: "",
		Status: "",
		Icon: "",
		Date: "",
		textDirection: "",
		Code: "",
	};
	const [language, setlanguage] = useState(languagemodel);
	const [image, setImg] = useState();
	const imgupload = (e) => {
		const data = new FormData();
		data.append("file", e.target.files[0]);
		axios
			.post(`${process.env.REACT_APP_SERVER}uploads/images`, data)
			.then((res) => {
				const link = res.data.link;
				console.log(res.data);
				setImg(e.target.files[0]);
				setlanguage({ ...language, Icon: link });
			});
	};

	var cdate = moment().toString();
	const inputHandler = (e) => {
		const { name, value } = e.target;
		setlanguage({ ...language, [name]: value });
		console.log(language);
	};
	const submitHandler = async (e) => {
		e.preventDefault();
		await axios
			.put(
				`${process.env.REACT_APP_SERVER}applanguages/${id}`,
				language
			)
			.then((res) => {
				console.log(res);
				navigate("/applanguages");
			})
			.catch((error) => console.log(error));
	};

	return (
		<div>
			<h1>Add App Language</h1>
			<div className="Card">
				<div className="drop-group">
					<div className="drop-col">
						{" "}
						<span className="drop-lable">Lanugage Name</span>
						<input
							type="text"
							className="md-in"
							name="Name"
							value={language.Name}
							onChange={inputHandler}
						/>
					</div>
					<div className="drop-col">
						{" "}
						<span className="drop-lable">Status</span>
						<select
							className="drop"
							name="Status"
							onChange={inputHandler}
							value={language.Status}
							id="scat">
							<option value="STATUS_ACTIVE">Active</option>
							<option value="STATUS_INACTIVE">Inactive</option>
						</select>
					</div>
				</div>
				<div className="drop-group">
					<div className="drop-col">
						{" "}
						<span className="drop-lable">Code</span>
						<input type="text" name="Code" onChange={inputHandler} />
					</div>
					<div className="drop-col">
						{" "}
						<span className="drop-lable">Direction</span>
						<select
							className="drop"
							name="textDirection"
							onChange={inputHandler}
							value={language.textDirection}
							id="scat">
							<option value="LTR">LTR</option>
							<option value="RTL">RTL</option>
						</select>
					</div>
				</div>
				<div className="drop-col">
					{" "}
					<span className="drop-lable">
						Language Name (For Admin)
					</span>
					<input
						type="text"
						name="adminName"
						onChange={inputHandler}
						value={language.adminName}
						readOnly
					/>
				</div>
				<FileInputComponent
					title="Upload Image or add link"
					links={language.Icon}
					onDelete={() => setlanguage({ ...language, Icon: "" })}
					onAdd={(image) => setlanguage({ ...language, Icon: image })}
					type={"single"}
				/>

				<div className="center">
					{" "}
					<button onClick={submitHandler} className="addButton">
						Update App Language
					</button>
				</div>
			</div>
		</div>
	);
}

export default AppLanguageUpdate;
