import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import {
	Navigate,
	useNavigate,
	Link,
	useParams,
} from "react-router-dom";
import TitleComponent from "../../components/form-components/Title";
import FilecardList from "../file-manager/utils/FilecardList";

function ViewPage() {
	const [SubCat, Setsubcat] = useState([]);
	const [Cat, Setcat] = useState([]);
	const { id } = useParams();

	const Api = `${process.env.REACT_APP_SERVER}pages/${id}`;
	// Fetch Categories and Subcategoeries

	const fetchsubcategory = async (parent) => {
		try {
			const Api2 = `${process.env.REACT_APP_SERVER}c/categories/sub/find/${parent}`;
			const Subcategoeries = await axios.get(Api2);
			//console.log(Subcategoeries);
			Setsubcat(Subcategoeries.data);
		} catch (error) {}
	};

	async function fetchdata() {
		try {
			const response = await axios.get(Api);
			setPage(response.data);
			const category = await axios.get(
				`${process.env.REACT_APP_SERVER}c/categories/in/Pages`
			);
			Setcat(category.data);
		} catch (error) {}
	}

	const navigate = useNavigate();
	const Model = {
		category: "",
		subcategory: "",
		pagestyle: "",
		cardstyle: "",
		status: "",
		publish: "",
		cardcolor: "",
		cardShadow: "",
		shadowx: "",
		shadowy: "",
		shadowx1: "",
		shadowy1: "",
		shadowColor: "",
		blur: "",
		spread: "",
		title: "",
		image: "",
		innerimage: [],
		Availability: {},
		Languages: [],
		defaultLanguage: "",
	};
	const [Page, setPage] = useState(Model);
	const inputHandler = (e) => {
		const { name, value } = e.target;
		setPage({ ...Page, [name]: value });
	};

	useEffect(() => {
		fetchdata();
	}, []);

	const Dropselect = (e) => {
		setPage({ ...Page, category: e.target.value });
		const matchedCategory = Cat.find(
			(category) => category.Name === e.target.value
		);
		fetchsubcategory(matchedCategory._id);
	};

	return (
		<div>
			<>
				<h1>Page / Add Page (Content)</h1>
				<div className="Card">
					<div className="drop-group">
						<div className="drop-col">
							{" "}
							<span className="drop-lable">Select Category</span>
							<select
								className="drop"
								name="category"
								value={Page.category}
								onChange={(e) => Dropselect(e)}>
								<option value="">------</option>
								{Cat.map((op, index) => {
									return (
										<option key={op.Name} value={op.Name}>
											{op.Name}
										</option>
									);
								})}
							</select>
						</div>
						<div className="drop-col">
							{" "}
							<span className="drop-lable">Select Sub Category</span>
							<select
								className="drop"
								value={Page.subcategory}
								name="subcategory">
								<option value="">------</option>
								{SubCat.map((op, index) => {
									return (
										<option key={op.Name} value={op.Name}>
											{op.Name}
										</option>
									);
								})}
							</select>
						</div>
						<div className="drop-col">
							{" "}
							<span className="drop-lable">Select Page Style</span>
							<select
								className="drop"
								value={Page.pagestyle}
								name="pagestyle">
								<option value="">---------------</option>
								<option value="scripture">
									Page Style 1 (Scriptures)
								</option>
								<option value="aarti">Page Style 2 (Aarti)</option>
								<option value="temple">Page Style 3 (Temple)</option>
								<option value="extra">Page Style 4 (Extra)</option>
								<option value="blog">Page Style 5 (Blogs)</option>
								<option value="scripture2">
									Page Style 6 (Scriptures 2)
								</option>
							</select>
						</div>
						<div className="drop-col">
							{" "}
							<span className="drop-lable">Select Card Style</span>
							<select
								className="drop"
								value={Page.cardstyle}
								name="cardstyle">
								<option value="1">Style 1</option>
							</select>
						</div>
						<div className="drop-col">
							{" "}
							<span className="drop-lable">Page Status</span>
							<select
								className="drop"
								name="status"
								value={Page.status}>
								<option value="STATUS_ACTIVE">Active</option>
								<option value="STATUS_INACTIVE">Inactive</option>
							</select>
						</div>
						<div className="drop-col">
							{" "}
							<span className="drop-lable">Publish</span>
							{/* <input
								disabled
								type="datetime-local"
								name="publish"
								value={Page.publish.toString().slice(0, 16)}
							/> */}
								<input
								type="datetime-local"
								name="publish"
								value={Page.publish?.toString().slice(0, 16) || ""}
								onChange={inputHandler}
							/>

						</div>
					</div>
				</div>
				<div className="Card">
					<h1>Card Style</h1>
					<div className="drop-group">
						<div className="drop-col">
							<span>Select Card Style</span>
							<select name="cardstyle">
								<option value="1">Style 1</option>
							</select>
						</div>
						<div className="drop-col">
							<span>Card Color</span>

							<input
								disabled
								type="text"
								value={Page.cardcolor}
								name="cardcolor"
							/>
						</div>
						<div className="drop-col">
							<span>Card Shadow</span>
							<select value={Page.cardShadow} name="cardShadow">
								<option value="1">Yes</option>
								<option value="2">No</option>
							</select>
						</div>
						<div className="drop-2-col">
							<input
								disabled
								type="text"
								name="shadowx"
								value={Page.shadowx}
								placeholder="x:"
							/>
							<input
								disabled
								type="text"
								name="shadowy"
								placeholder="y:"
								value={Page.shadowy}
							/>
						</div>
						<div className="drop-col">
							<span>Shadow Color</span>
							<input
								disabled
								type="text"
								name="shadowColor"
								value={Page.shadowColor}
							/>
						</div>
						<div className="drop-2-col">
							<input
								disabled
								type="text"
								name="shadowx1"
								value={Page.shadowx1}
								placeholder="x:"
							/>
							<input
								disabled
								type="text"
								name="shadowy1"
								value={Page.shadowy1}
								placeholder="y:"
							/>
						</div>
						<div className="drop-col">
							<span>Blur</span>
							<input
								disabled
								type="text"
								name="blur"
								value={Page.blur}
							/>
						</div>
						<div className="drop-col">
							<span>Spread</span>
							<input
								disabled
								type="text"
								name="spread"
								value={Page.spread}
							/>
						</div>
					</div>
				</div>
				<div className="Card">
					<h1>Admin</h1>
					{TitleComponent(Page.title, (e) =>
						setPage({ ...Page, title: e })
					)}
				</div>
				<div className="Card tablecard">
					<h1>Front Page Details</h1>
					{FilecardList(Page.image, "single")}
				</div>
				<div className="Card tablecard">
					<h1>Inner Page Details</h1>
					{/* {FilecardList(Page.innerimage, "multiple")} */}
					{Array.isArray(Page.innerimage) ? (
		FilecardList(Page.innerimage, "multiple")
	) : (
		<div>No inner images available</div>
	)}
				</div>

				<ToastContainer />
			</>
		</div>
	);
}

export default ViewPage;
