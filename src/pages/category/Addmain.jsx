import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import FileInputComponent from "../file-manager/components/FileInputComponent";
import LanguageInputComponent from "../../components/form-components/LanguageInput.component";
import notifySuccess from "../../components/toasts/Success.toast";
import notifyError from "../../components/toasts/Err.toast";
import { ToastContainer } from "react-toastify";

export function AddMainCategory() {
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
	const [languageslist, setLanguagesList] = useState([]);
	const [languages, setLanguages] = useState({});
	useEffect(() => {
		setcat({ ...cat, Languages: languages });
	}, [languages]);
	async function fetchLanguages() {
		try {
			const res = await axios.get(
				`${process.env.REACT_APP_SERVER}applanguages/`
			);
			setLanguagesList(res.data);
		} catch (error) {}
	}

	useEffect(() => {
		fetchLanguages();
	}, []);

	const inputHandler = (e) => {
		const { name, value } = e.target;
		setcat({ ...cat, [name]: value });
		// console.log(cat);
	};
	const submit = async (e) => {
		e.preventDefault();
		await axios
			.post(`${process.env.REACT_APP_SERVER}c/categories/main/`, cat)
			.then((res) => {
				if (res.status == 200) {
					notifySuccess("Successfully created category");
					navigate("/category");
				} else if (res.status == 400) {
					notifyError("Category already exists");
				}
			})
			.catch((error) => notifyError("Unable to create category"));
	};

	return (
		<div>
			<h1>Add Category / Sub Category</h1>
			<div className="Card">
				<div className="options center">
					<Link to="/category/add/main">
						{" "}
						<input
							type="radio"
							name="radios"
							id="rmain"
							hidden
							defaultChecked
						/>
						<label htmlFor="rmain" className="check">
							Main Category
						</label>
					</Link>
					<Link to="/category/add/subcategory">
						<input type="radio" name="radios" hidden id="rcat" />
						<label htmlFor="rcat">Sub Category</label>
					</Link>
					<Link to="/category/add/innercategory">
						{" "}
						<input type="radio" name="radios" hidden id="rsub" />
						<label htmlFor="rsub">Inner Category</label>
					</Link>
				</div>

				<div className="social-group">
					<div className="drop-col">
						{" "}
						<span className="drop-lable">Category In</span>
						<select
							onChange={inputHandler}
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
						<input type="text" name="Name" onChange={inputHandler} />
					</div>
					<div className="drop-col">
						{" "}
						<span className="drop-lable">Status</span>
						<select
							className="drop"
							name="Status"
							onChange={inputHandler}
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
							type="text"
							onChange={inputHandler}
							name="Bannercolor"
						/>
					</div>
					<div className="drop-col">
						<span className="drop-lable">Heading Font Color</span>
						<input
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
							onChange={inputHandler}
							name="Colorright"
						/>
					</div>
				</div>
			</div>
			<div className="center mb-10">
				{" "}
				<button className="addButton" onClick={submit}>
					Add Category
				</button>
			</div>
			<ToastContainer />
		</div>
	);
}

export default AddMainCategory;
