import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import {
	Navigate,
	useNavigate,
	Link,
	useParams,
} from "react-router-dom";
import EditorComponent from "../../components/form-components/EditorComponent";

function UpdateFaq() {
	const { id } = useParams();
	const Api = `${process.env.REACT_APP_SERVER}faqs/faq/${id}`;
	const [loading, setloading] = useState();
	const [Langs, Setlangs] = useState([]);
	function fetchLanguages() {
		try {
			axios
				.get(`${process.env.REACT_APP_SERVER}languages/`)
				.then((res) => {
					Setlangs(res.data);
				})
				.catch((e) => {});
		} catch (error) {}
	}
	function fetchdata() {
		try {
			setloading(true);
			axios
				.get(Api)
				.then((res) => {
					setPage(res.data);
					console.log(Page);
				})
				.catch((e) => {});
		} catch (error) {}
		setloading(false);
	}

	useEffect((async) => {
		fetchLanguages();
		fetchdata();
	}, []);
	const removelanguage = (value) => {
		const list = Page.Languages?.length > 0 ? Page.Languages : [];

		// Check if the value already exists in the array
		const index = list.indexOf(value);

		if (index !== -1) {
			// If the value exists, remove it
			const updatedList = list?.filter((item) => item !== value);
			setPage({ ...Page, Languages: updatedList });
		} else {
			// If the value doesn't exist, add it
			const updatedList = [...list, value];
			setPage({ ...Page, Languages: updatedList });
		}
	};

	const navigate = useNavigate();
	const Model = {
		title: "",
		Status: "STATUS_ACTIVE",
		Languages: [],
	};
	const [Page, setPage] = useState(Model);
	const inputHandler = (e) => {
		const { name, value } = e.target;
		setPage({ ...Page, [name]: value });
		console.log(Page);
	};
	const submitHandler = async (e) => {
		e.preventDefault();

		if (Page.title === "") {
			const notify = () =>
				toast.error("Title is required", {
					position: "bottom-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
			notify();
		} else {
			await axios
				.put(Api, Page)
				.then((res) => {
					console.log(res);
					navigate("/faq");
				})
				.catch((error) => console.log(error));
		}
	};

	async function pageRedirector(language) {
		if (Page.title === "") {
			const notify = () =>
				toast.error("Title is required", {
					position: "bottom-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
			notify();
		} else {
			try {
				await axios
					.put(Api, Page)
					.then((res) => {
						try {
							axios
								.get(
									`${process.env.REACT_APP_SERVER}faqs/content/${id}/${language}`
								)
								.then((res) => {
									if (res.data._id) {
										navigate(
											`/faq/edit/content/${res.data._id}/${language}`
										);
									} else {
										navigate(`/faq/add/content/${id}/${language}`);
									}
								})
								.catch((e) => {
									const notify = () =>
										toast.error("Unexpected Error ouccured", {
											position: "bottom-right",
											autoClose: 5000,
											hideProgressBar: false,
											closeOnClick: true,
											pauseOnHover: true,
											draggable: true,
											progress: undefined,
											theme: "light",
										});
									notify();
								});
						} catch (error) {
							const notify = () =>
								toast.error("Unexpected Error ouccured", {
									position: "bottom-right",
									autoClose: 5000,
									hideProgressBar: false,
									closeOnClick: true,
									pauseOnHover: true,
									draggable: true,
									progress: undefined,
									theme: "light",
								});
							notify();
						}
					})
					.catch((error) => console.log(error));
			} catch (error) {}
		}
	}

	return (
		<div>
			<h1>FAQ / Add FAQ </h1>

			<div className="Card">
				<h1>Admin</h1>
				{EditorComponent(
					Page.title,
					(e) => setPage({ ...Page, title: e }),
					"Add Title"
				)}
				<div className="drop-col">
					{" "}
					<span className="drop-lable">Status</span>
					<select
						className="drop"
						name="Status"
						onChange={inputHandler}
						value={Page.Status}
						id="scat">
						<option value="STATUS_ACTIVE">Active</option>
						<option value="STATUS_INACTIVE">Inactive</option>
					</select>
				</div>
			</div>

			<div className="Card">
				{Langs?.map((lang, i) => {
					const isSelected =
						Page.Languages?.indexOf(lang.adminName) !== -1;

					return (
						<div className="drop-group" key={lang.adminName + i}>
							<label
								className="drop-check"
								style={{
									background: isSelected ? "orange" : "transparent",
									color: isSelected ? "white" : "black",
								}}
								htmlFor={`${i}-lang`}>
								<input
									onChange={() => removelanguage(lang.adminName)}
									type="checkbox"
									name="langcheck"
									id={`${i}-lang`}
									className="checkbox"
									checked={isSelected}
								/>
								<span> {lang.adminName}</span>
							</label>

							<div className="langbtn">
								<button
									onClick={() => pageRedirector(lang.adminName)}
									className="addButton btnoutline">
									View More
								</button>
							</div>
						</div>
					);
				})}
			</div>
			<div className="center mb-10">
				<button className="addButton" onClick={submitHandler}>
					Submit
				</button>
			</div>
			<ToastContainer />
		</div>
	);
}

export default UpdateFaq;
