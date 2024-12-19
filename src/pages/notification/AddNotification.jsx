import React, { Component, useState } from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import {
	Navigate,
	useNavigate,
	Link,
	useParams,
} from "react-router-dom";
import axios from "axios";
function AddNotification() {
	const navigate = useNavigate();
	//Data Handlers
	const Api = `${process.env.REACT_APP_SERVER}notification/`;
	const FormModal = {
		Title: "",
		Languages: [],
	};
	const [Formdata, setFormdata] = useState(FormModal);
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

	useEffect(() => {
		fetchLanguages();
	}, []);
	const inputHandler = (e) => {
		const { name, value } = e.target;
		setFormdata({ ...Formdata, [name]: value });
	};

	const removelanguage = (value) => {
		const list =
			Formdata.Languages?.length > 0 ? Formdata.Languages : [];

		// Check if the value already exists in the array
		const index = list.indexOf(value);

		if (index !== -1) {
			// If the value exists, remove it
			const updatedList = list?.filter((item) => item !== value);
			setFormdata({ ...Formdata, Languages: updatedList });
		} else {
			// If the value doesn't exist, add it
			const updatedList = [...list, value];
			setFormdata({ ...Formdata, Languages: updatedList });
		}
	};

	async function pageRedirector(language) {
		if (Formdata.Title === "") {
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
					.post(Api, Formdata)
					.then((res) => {
						console.log(res);
						navigate(
							`/notification/add/content/${res.data._id}/${language}`
						);
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

	const HandleSubmit = async (e) => {
		e.preventDefault();
		await axios
			.post(`${process.env.REACT_APP_SERVER}notification`, Formdata)
			.then((res) => {
				console.log(res);
				navigate("/notification");
			})
			.catch((error) => console.log(error));
	};

	//Formdata

	return (
		<div>
			<h1>Add Notification</h1>
			<div className="Card">
				<div className="drop-col">
					<span className="drop-lable">Title</span>
					<input
						type="text"
						name="Title"
						value={Formdata.Title}
						onChange={inputHandler}
					/>
				</div>
			</div>
			<div className="Card">
				{Langs?.map((lang, i) => {
					const isSelected =
						Formdata.Languages?.indexOf(lang.adminName) !== -1;

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
			<div className="center">
				<button className="addButton" onClick={HandleSubmit}>
					Add Notification
				</button>
			</div>
			<ToastContainer />
		</div>
	);
}

export default AddNotification;
