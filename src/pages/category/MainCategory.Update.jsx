import React, { Component, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import FileInputComponent from "../file-manager/components/FileInputComponent";
import LanguageInputComponent from "../../components/form-components/LanguageInput.component";
function MainCategoryUpdate() {
	const { id } = useParams();
	var Api = `${process.env.REACT_APP_SERVER}c/categories/main/${id}`;

	async function fetchdata() {
		try {
			const res = await axios.get(Api);
			setcat(res.data);
			setLanguages(res.data.Languages);
			console.log(res);
		} catch (error) { }
	}

	useEffect(() => {
		fetchdata();
	}, []);

	const [languageslist, setLanguagesList] = useState([]);
	const [languages, setLanguages] = useState({});
	useEffect(() => {
		setcat({ ...cat, Languages: languages });
		console.log(cat);
	}, [languages]);
	async function fetchLanguages() {
		try {
			const res = await axios.get(
				`${process.env.REACT_APP_SERVER}applanguages/`
			);
			setLanguagesList(res.data);
		} catch (error) { }
	}

	useEffect(() => {
		fetchLanguages();
	}, []);

	const navigate = useNavigate();
	const maincat = {
		Name: "",
		CategoryIn: "",
		Status: "STATUS_ACTIVE",
		Icon: "",
		Bannercolor: "",
		Headfontcolor: "",
		Colorleft: "",
		Colorright: "",
		Names: [],
		Languages: {},
	};
	const [cat, setcat] = useState(maincat);
	const inputHandler = (e) => {
		const { name, value } = e.target;
		setcat({ ...cat, [name]: value });
	};
	const submit = async (e) => {
		e.preventDefault();
		await axios
			.put(
				`${process.env.REACT_APP_SERVER}c/categories/main/${id}`,
				cat
			)
			.then((res) => {
				console.log(res);
				navigate("/category");
			})
			.catch((error) => console.log(error));
	};

	return (
		<div>
			<h1>Add Category / Sub Category</h1>
			<div className="Card">
				<div className="social-group">
					<div className="drop-col">
						{" "}
						<span className="drop-lable">Category In</span>
						<select
							onChange={inputHandler}
							value={cat.CategoryIn}
							className="drop"
							name="CategoryIn"
							id="catin">
							<option value="">---------------</option>
							<option value="Pages">Pages</option>
							<option value="Donation">Donation</option>
							<option value="Invoices">Invoices</option>
							<option value="Blogs">Blogs</option>
							<option value="Users">Users</option>
						</select>
					</div>
					<div className="drop-col">
						<span className="drop-lable">Category Name</span>
						<input
							type="text"
							value={cat.Name}
							name="Name"
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
							value={cat.Status}
							id="scat">
							<option value="STATUS_ACTIVE">Active</option>
							<option value="STATUS_INACTIVE">Inactive</option>
						</select>
					</div>
				</div>
				<FileInputComponent
					title="Upload Image or add link"
					links={cat.Icon}
					onDelete={() => setcat({ ...cat, Icon: "" })}
					onAdd={(image) => setcat({ ...cat, Icon: image })}
					type={"single"}
				/>
			</div>

			<LanguageInputComponent
				languages={languages}
				setLanguages={setLanguages}
				items={languageslist}
			/>
			<div className="Card">
				<div className="drop-group">
					<div className="drop-col">
						<span className="drop-lable">Heading Banner Color</span>
						<input
							value={cat.Bannercolor}
							type="text"
							onChange={inputHandler}
							name="Bannercolor"
						/>
					</div>
					<div className="drop-col">
						<span className="drop-lable">Heading Font Color</span>
						<input
							value={cat.Headfontcolor}
							type="text"
							onChange={inputHandler}
							name="Headfontcolor"
						/>
					</div>
					<div className="drop-col">
						<span className="drop-lable">
							Category Color -Left side
						</span>
						<input
							value={cat.Colorleft}
							type="text"
							onChange={inputHandler}
							name="Colorleft"
						/>
					</div>
					<div className="drop-col">
						<span className="drop-lable">
							Category Color -Right side
						</span>
						<input
							type="text"
							value={cat.Colorright}
							onChange={inputHandler}
							name="Colorright"
						/>
					</div>
				</div>
			</div>
			<div className="center mb-10">
				{" "}
				<button className="addButton" onClick={submit}>
					Update Category
				</button>
			</div>
		</div>
	);
}

export default MainCategoryUpdate;
