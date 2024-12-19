import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import FileInputComponent from "../file-manager/components/FileInputComponent";

function AddInnerCategory() {
	const navigate = useNavigate();
	var Api = `${process.env.REACT_APP_SERVER}c/categories/subcategories`;

	const [data, Setdata] = useState([]);
	async function fetchdata() {
		try {
			const response = await axios.get(Api);
			const res = await axios.get(
				`${process.env.REACT_APP_SERVER}applanguages/`
			);
			Setlangs(res.data);
			Setdata(response.data);
		} catch (error) {}
	}
	const [Langs, Setlangs] = useState([]);
	const [AddAvailable, Availblearray] = useState({});
	const AddAvailablity = (id, value) => {
		Availblearray({ ...AddAvailable, [id]: value });
		setcat({ ...cat, Names: AddAvailable });
		console.log(cat);
	};
	function removelanguage(value) {
		const index = cat.Languages.indexOf(value); // Check if the value already exists in the AddLanguageay

		if (index !== -1) {
			// If the value exists, remove it
			cat.Languages.splice(index, 1);
		} else {
			// If the value doesn't exist, add it
			cat.Languages.push(value);
		}
		setcat({ ...cat, Availablity: AddAvailable });
		console.log(cat);
	}

	useEffect(() => {
		fetchdata();
	});

	const maincat = {
		parent: "",
		name: "",
		status: "",
		caticon: "",
		bannercolor: "",
		fontcolor: "",
		leftcolor: "",
		rightcolor: "",
		Names: [],
		Languages: [],
	};
	const [cat, setcat] = useState(maincat);
	const inputHandler = (e) => {
		const { name, value } = e.target;
		setcat({ ...cat, [name]: value });
		console.log(cat);
	};
	const submit = async (e) => {
		e.preventDefault();
		await axios
			.post(`${process.env.REACT_APP_SERVER}c/categories/inner`, cat)
			.then((res) => {
				console.log(res);

				navigate(`/category/innercategory`);
			})
			.catch((error) => console.log(error));
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
						<label htmlFor="rmain">Main Category</label>
					</Link>
					<Link to="/category/add/subcategory">
						<input type="radio" name="radios" hidden id="rcat" />
						<label htmlFor="rcat">Sub Category</label>
					</Link>
					<Link to="/category/add/innercategory">
						{" "}
						<input type="radio" name="radios" hidden id="rsub" />
						<label htmlFor="rsub" className="check">
							Inner Category
						</label>
					</Link>
				</div>

				<div className="social-group">
					<div className="drop-col">
						{" "}
						<span className="drop-lable">Category</span>
						<select
							onChange={inputHandler}
							className="drop"
							name="parent"
							id="scat">
							<option value="">---------------</option>
							{data.map((op) => {
								return <option value={op._id}>{op.Name}</option>;
							})}
						</select>
					</div>
					<div className="drop-col drop-lg">
						<span className="drop-lable">Category Name</span>
						<input onChange={inputHandler} type="text" name="name" />
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
					links={cat.caticon}
					onDelete={() => setcat({ ...cat, caticon: "" })}
					onAdd={(image) => setcat({ ...cat, caticon: image })}
					type={"single"}
				/>
			</div>
			<div className="Card">
				{Langs.map((lang, i) => {
					return (
						<div className="drop-group">
							<label
								className="drop-check"
								style={{
									background:
										cat.Languages.indexOf(lang._id) !== -1
											? "orange"
											: "transparent",
									color:
										cat.Languages.indexOf(lang._id) !== -1
											? "white"
											: "black",
								}}
								htmlFor={i + "lang"}>
								<input
									onChange={(e) => removelanguage(lang._id)}
									type="checkbox"
									name="langcheck"
									id={i + "lang"}
									className="checkbox"
									checked={
										cat.Languages.indexOf(lang._id) !== -1
											? true
											: false
									}
								/>
								<span> {lang.Name}</span>
							</label>

							<div className="drop-col">
								<input
									type="text"
									onChange={(e) =>
										AddAvailablity(lang._id, e.target.value)
									}
									placeholder="Category"
								/>
							</div>
						</div>
					);
				})}
			</div>
			<div className="Card">
				<div className="drop-group">
					<div className="drop-col">
						<span className="drop-lable">Heading Banner Color</span>
						<input
							type="text"
							onChange={inputHandler}
							name="bannercolor"
						/>
					</div>
					<div className="drop-col">
						<span className="drop-lable">Heading Font Color</span>
						<input
							type="text"
							onChange={inputHandler}
							name="fontcolor"
						/>
					</div>
					<div className="drop-col">
						<span className="drop-lable">
							Category Color -Left side
						</span>
						<input
							type="text"
							onChange={inputHandler}
							name="leftcolor"
						/>
					</div>
					<div className="drop-col">
						<span className="drop-lable">
							Category Color -Right side
						</span>
						<input
							type="text"
							onChange={inputHandler}
							name="rightcolor"
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
		</div>
	);
}

export default AddInnerCategory;
