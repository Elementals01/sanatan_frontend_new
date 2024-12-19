import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import EditorComponent from "../../components/form-components/EditorComponent";
const Api = `${process.env.REACT_APP_SERVER}faqs/faq`;

function AddFaq() {
	const [loading, setloading] = useState();
	const [Langs, Setlangs] = useState([]);
	function fetchLanguages() {
		try {
			axios
				.get(`${process.env.REACT_APP_SERVER}languages/`)
				.then((res) => {
					Setlangs(res.data);
					console.log(res.data);
				})
				.catch((e) => {});
		} catch (error) {}
	}
	useEffect(() => {
		fetchLanguages();
	}, []);
	const removelanguage = (value) => {
		const list = Page.Languages;

		// Check if the value already exists in the array
		const index = list.indexOf(value);

		if (index !== -1) {
			// If the value exists, remove it
			const updatedList = list.filter((item) => item !== value);
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
				.post(Api, Page)
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
					.post(Api, Page)
					.then((res) => {
						console.log(res);
						navigate(`/faq/add/content/${res.data._id}/${language}`);
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
				{Langs.map((lang, i) => {
					return (
						<div className="drop-group">
							<label
								className="drop-check"
								style={{
									background:
										Page.Languages.indexOf(lang.adminName) !== -1
											? "orange"
											: "transparent",
									color:
										Page.Languages.indexOf(lang.adminName) !== -1
											? "white"
											: "black",
								}}
								htmlFor={i + "lang"}>
								<input
									onChange={(e) => removelanguage(lang.adminName)}
									type="checkbox"
									name="langcheck"
									id={i + "lang"}
									className="checkbox"
									checked={
										Page.Languages.indexOf(lang.adminName) !== -1
											? true
											: false
									}
								/>
								<span> {lang.adminName}</span>
							</label>

							<div className="langbtn">
								<button
									onClick={() => pageRedirector(lang.adminName)}
									className="addButton btnoutline">
									{" "}
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

export default AddFaq;
