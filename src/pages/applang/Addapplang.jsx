import axios from "axios";
import moment from "moment";
import React, { Component, useState } from "react";
import { useNavigate } from "react-router-dom";
import FileInputComponent from "../file-manager/components/FileInputComponent";

function AddApplang() {
	const navigate = useNavigate();
	const languagemodel = {
		adminName: "",
		Name: "",
		Status: "STATUS_ACTIVE",
		Icon: "",
		Code: "",
		textDirection: "",
		Date: "",
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

				setImg(e.target.files[0]);
				setlanguage({ ...language, icon: link });
			});
	};

	var cdate = moment().toString();
	const inputHandler = (e) => {
		const { name, value } = e.target;

		setlanguage({ ...language, date: cdate });
		setlanguage({ ...language, [name]: value });
		console.log(language);
	};
	const submitHandler = async (e) => {
		e.preventDefault();
		await axios
			.post(`${process.env.REACT_APP_SERVER}applanguages/`, language)
			.then((res) => {
				console.log(res);
				navigate("/applanguages");
			})
			.catch((error) => console.log(error));
	};

	return (
		<div>
			<h1>Add Language</h1>
			<div className="Card">
				<div className="drop-group">
					<div className="drop-col">
						{" "}
						<span className="drop-lable">Lanugage Name</span>
						<input type="text" name="Name" onChange={inputHandler} />
					</div>
					<div className="drop-col">
						{" "}
						<span className="drop-lable">Status</span>
						<select
							className="drop"
							name="status"
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
						Add Language
					</button>
				</div>
			</div>
		</div>
	);
}

export default AddApplang;
