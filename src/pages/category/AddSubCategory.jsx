import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FileInputComponent from "../file-manager/components/FileInputComponent";
import LanguageInputComponent from "../../components/form-components/LanguageInput.component";
import notifyError from "../../components/toasts/Err.toast";
import notifySuccess from "../../components/toasts/Success.toast";
import { ToastContainer } from "react-toastify";

function AddSubCategory() {
	var Api = `${process.env.REACT_APP_SERVER}c/categories/main`;
	const [data, Setdata] = useState([]);
	function fetchdata() {
		try {
			axios
				.get(Api)
				.then((res) => {
					Setdata(res.data);
				})
				.catch((e) => {});
		} catch (error) {}
	}

	function fetchLanguages() {
		try {
			axios
				.get(`${process.env.REACT_APP_SERVER}applanguages/`)
				.then((res) => {
					setLanguagesList(res.data);
				})
				.catch((e) => {});
		} catch (error) {}
	}

	const navigate = useNavigate();

	const cats = {
		Parent: "",
		Name: "",
		Status: "STATUS_ACTIVE",
		Icon: "",
		Bannercolor: "",
		Headfontcolor: "",
		Colorleft: "",
		Colorright: "",
		Names: [],
		Languages: {},
	};
	const [cat, setcat] = useState(cats);

	const inputHandler = (e) => {
		const { name, value } = e.target;
		setcat({ ...cat, [name]: value });
		console.log(cat);
	};
	const submit = async (e) => {
		e.preventDefault();
		await axios
			.post(`${process.env.REACT_APP_SERVER}c/categories/sub`, cat)
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
	useEffect(() => {
		fetchLanguages();
		fetchdata();
	}, []);
	const [languageslist, setLanguagesList] = useState([]);
	const [languages, setLanguages] = useState({});
	useEffect(() => {
		setcat({ ...cat, Languages: languages });
	}, [languages]);

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
						<label htmlFor="rmain">Main Category</label>
					</Link>
					<Link to="/category/add/subcategory">
						<input type="radio" name="radios" hidden id="rcat" />
						<label htmlFor="rcat" className="check">
							Sub Category
						</label>
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
						<span className="drop-lable">Category</span>
						<select
							onChange={inputHandler}
							className="drop"
							name="Parent"
							id="scat">
							<option value="0">---------------</option>
							{data.map((op, index) => {
								return <option value={op._id}>{op.Name}</option>;
							})}
						</select>
					</div>
					<div className="drop-col drop-lg">
						<span className="drop-lable">Category Name</span>
						<input onChange={inputHandler} type="text" name="Name" />
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

export default AddSubCategory;
