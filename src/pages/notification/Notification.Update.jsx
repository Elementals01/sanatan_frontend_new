import React, { Component, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DescriptionComponent from "../../components/form-components/Description";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function UpdateNotification() {
	const { id } = useParams();
	const navigate = useNavigate();
	var Api = `${process.env.REACT_APP_SERVER}notification/${id}`;
	//Data Handlers

	const FormModal = {
		Name: "",
		Link: "",
		Description: "",
		Publish: "",
	};
	const [Formdata, setFormdata] = useState(FormModal);
	function fetchdata() {
		try {
			axios
				.get(Api)
				.then((res) => {
					setFormdata(res.data);
				})
				.catch((e) => {});
		} catch (error) {}
	}

	useEffect(() => {
		fetchdata();
	}, []);

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
					.put(Api, Formdata)
					.then((res) => {
						try {
							axios
								.get(
									`${process.env.REACT_APP_SERVER}notification/content/${id}/${language}`
								)
								.then((res) => {
									if (res.data._id) {
										navigate(
											`/notification/edit/content/${res.data._id}/${language}`
										);
									} else {
										navigate(
											`/notification/add/content/${id}/${language}`
										);
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

	const HandleSubmit = async (e) => {
		e.preventDefault();
		await axios
			.put(
				`${process.env.REACT_APP_SERVER}notification/${id}`,
				Formdata
			)
			.then((res) => {
				console.log(res);
				navigate("/notification");
			})
			.catch((error) => console.log(error));
	};

	//Formdata

	return (
		<div>
			<h1>Update Notification</h1>
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
					Update Notification
				</button>
			</div>
			<ToastContainer />
		</div>
	);
}

export default UpdateNotification;
