import React, { Component, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import FileInputComponent from "../file-manager/components/FileInputComponent";
import LanguageInputComponent from "../../components/form-components/LanguageInput.component";
function SubCategoryUpdate() {
	const { parent, id } = useParams();

	var Api = `${process.env.REACT_APP_SERVER}c/categories/main/`;
	const [Error, seterror] = useState(false);
	const [loading, setloading] = useState(false);
	const [data, Setdata] = useState([]);
	function fetchdata() {
		try {
			setloading(true);
			seterror(false);
			axios
				.get(Api)
				.then((res) => {
					Setdata(res.data);
				})
				.catch((e) => {
					seterror(true);
					setloading(false);
				});

			setloading(false);
		} catch (error) {
			seterror(true);
			setloading(false);
		}
	}
	function fetchcat() {
		try {
			setloading(true);
			seterror(false);
			axios
				.get(`${process.env.REACT_APP_SERVER}c/categories/sub/${id}`)
				.then((res) => {
					setcat(res.data);
					setLanguages(res.data.Languages);
				})
				.catch((e) => {
					seterror(true);
					setloading(false);
				});

			setloading(false);
		} catch (error) {
			seterror(true);
			setloading(false);
		}
	}

	useEffect(() => {
		fetchdata();
		fetchcat();
	}, []);

	const navigate = useNavigate();

	const maincat = {
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
	const [cat, setcat] = useState(maincat);

	const inputHandler = (e) => {
		const { name, value } = e.target;
		setcat({ ...cat, [name]: value });
		console.log(cat);
	};
	const submit = async (e) => {
		e.preventDefault();
		await axios
			.put(
				`${process.env.REACT_APP_SERVER}c/categories/sub/${id}`,
				cat
			)
			.then((res) => {
				console.log(res);
				navigate(`/category`);
			})
			.catch((error) => console.log(error));
	};

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

	return (
		<div>
			<h1>Add Category / Sub Category</h1>
			<div className="Card">
				<div className="social-group">
					<div className="drop-col">
						{" "}
						<span className="drop-lable">Category</span>
						<select
							value={cat.Parent}
							onChange={inputHandler}
							className="drop"
							name="Parent"
							id="scat">
							{data.map((op, index) => {
								return <option value={op._id}>{op.Name}</option>;
							})}
						</select>
					</div>
					<div className="drop-col drop-lg">
						<span className="drop-lable">Category Name</span>
						<input
							onChange={inputHandler}
							type="text"
							value={cat.Name}
							name="Name"
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

export default SubCategoryUpdate;
