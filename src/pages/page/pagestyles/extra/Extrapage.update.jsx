import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextEditor from "../../../../components/form-components/EditorComponent";

import { ToastContainer, toast } from "react-toastify";

function ExtraPagecontentupdate() {
	const navigate = useNavigate();

	const { id, lang } = useParams();
	const LanguageAdminName = lang;
	const PageModal = {
		Availablity: [],
		Media: ["pdf", "text", "video", "audio"],
		title: "<p></p>",
		description: "<p></p>",
		innertitle: "<p></p>",
		innerdescription: "<p></p>",
		middleinfo: "<p></p>",
		Page: id,
		Language: lang,
	};
	const [Page, setPage] = useState(PageModal);
	const [AddAvailable, Availblearray] = useState([{}]);
	const AddAvailablity = (id, value) => {
		Availblearray({ ...AddAvailable, [id]: value });
		setPage({ ...Page, Availablity: AddAvailable });
		console.log(Page);
	};
	const errormsg = () =>
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
	function fetchdata() {
		try {
			axios
				.get(`${process.env.REACT_APP_SERVER}page/extra/${id}`)
				.then((res) => {
					console.log(res.data);
					setPage(res.data);
					Availblearray(res.data.Availablity);
				})
				.catch((e) => {});
		} catch (error) {}
	}

	useEffect(() => {
		fetchdata();
	}, []);

	function addorRemove(value) {
		const index = Page.Media.indexOf(value); // Check if the value already exists in the AddLanguageay

		if (index !== -1) {
			// If the value exists, remove it
			Page.Media.splice(index, 1);
		} else {
			// If the value doesn't exist, add it
			Page.Media.push(value);
		}
		setPage({ ...Page, Availablity: AddAvailable });
	}

	const Savedata = async (e) => {
		e.preventDefault();
		try {
			const Api = `${process.env.REACT_APP_SERVER}page/extra/${id}`;
			await axios
				.put(Api, Page)
				.then((res) => {
					const notify = () =>
						toast.success("Successfully Updated", {
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
				})
				.catch((error) => errormsg());
		} catch (error) {
			errormsg();
		}
	};

	const Submitdata = async (e) => {
		e.preventDefault();
		try {
			const Api = `${process.env.REACT_APP_SERVER}page/extra/${id}`;
			await axios
				.put(Api, Page)
				.then((res) => {
					console.log(res);
					navigate(`/pages`);
				})
				.catch((error) => errormsg());
		} catch (error) {
			errormsg();
		}
	};

	return (
		<div>
			<h1>Add Page (Content) {LanguageAdminName} Language</h1>
			<div className="Card">
				<div className="drop-col">
					{" "}
					<span className="drop-lable">Select Language</span>
					<select name="Language" disabled>
						<option value={LanguageAdminName}>
							{LanguageAdminName}
						</option>
					</select>
				</div>
				<span className="drop-lable">Availablity</span>
				<div className="drop-group">
					<label
						className="drop-check"
						style={{
							background:
								Page.Media.indexOf("pdf") !== -1
									? "orange"
									: "transparent",
							color:
								Page.Media.indexOf("pdf") !== -1 ? "white" : "black",
						}}>
						<input
							type="checkbox"
							checked={
								Page.Media.indexOf("pdf") !== -1 ? true : false
							}
							onChange={(e) => addorRemove("pdf")}
							className="checkbox"
						/>
						<span className="drop-lable">Pdf</span>
					</label>
					<div className="drop-col">
						<select
							className="drop"
							onChange={(e) => AddAvailablity("Pdf", e.target.value)}>
							<option value="1">Active</option>
							<option value="2">Inactive</option>
							<option value="3">Hide</option>
						</select>
					</div>
					<label
						className="drop-check"
						style={{
							background:
								Page.Media.indexOf("text") !== -1
									? "orange"
									: "transparent",
							color:
								Page.Media.indexOf("text") !== -1 ? "white" : "black",
						}}>
						<input
							type="checkbox"
							checked={
								Page.Media.indexOf("text") !== -1 ? true : false
							}
							onChange={(e) => addorRemove("text")}
							className="checkbox"
						/>
						<span className="drop-lable">Text</span>
					</label>
					<div className="drop-col">
						<select
							className="drop"
							onChange={(e) =>
								AddAvailablity("text", e.target.value)
							}>
							<option value="1">Active</option>
							<option value="2">Inactive</option>
							<option value="3">Hide</option>
						</select>
					</div>
					<label
						className="drop-check"
						style={{
							background:
								Page.Media.indexOf("audio") !== -1
									? "orange"
									: "transparent",
							color:
								Page.Media.indexOf("audio") !== -1
									? "white"
									: "black",
						}}>
						<input
							type="checkbox"
							checked={
								Page.Media.indexOf("audio") !== -1 ? true : false
							}
							onChange={(e) => addorRemove("audio")}
							className="checkbox"
						/>
						<span className="drop-lable">Audio</span>
					</label>
					<div className="drop-col">
						<select
							className="drop"
							onChange={(e) =>
								AddAvailablity("audio", e.target.value)
							}>
							<option value="1">Active</option>
							<option value="2">Inactive</option>
							<option value="3">Hide</option>
						</select>
					</div>
					<label
						className="drop-check"
						style={{
							background:
								Page.Media.indexOf("video") !== -1
									? "orange"
									: "transparent",
							color:
								Page.Media.indexOf("video") !== -1
									? "white"
									: "black",
						}}>
						<input
							type="checkbox"
							checked={
								Page.Media.indexOf("video") !== -1 ? true : false
							}
							onChange={(e) => addorRemove("video")}
							className="checkbox"
						/>
						<span className="drop-lable">Video</span>
					</label>
					<div className="drop-col">
						<select
							className="drop"
							onChange={(e) =>
								AddAvailablity("video", e.target.value)
							}>
							<option value="1">Active</option>
							<option value="2">Inactive</option>
							<option value="3">Hide</option>
						</select>
					</div>
				</div>
			</div>

			<div className="Card">
				<h1>Front Page Details</h1>
				{
					new TextEditor(
						Page.title,
						(e) => setPage({ ...Page, title: e }),
						"Title"
					)
				}
				{
					new TextEditor(
						Page.description,
						(e) => setPage({ ...Page, description: e }),
						"Description"
					)
				}
			</div>
			<div className="Card">
				<h1>Inner Page Details</h1>
				{
					new TextEditor(
						Page.innertitle,
						(e) => setPage({ ...Page, innertitle: e }),
						"Inner Title"
					)
				}
				{
					new TextEditor(
						Page.innerdescription,
						(e) => setPage({ ...Page, innerdescription: e }),
						"Inner Description"
					)
				}
			</div>

			<div className="Card">
				{
					new TextEditor(
						Page.middleinfo,
						(e) => setPage({ ...Page, middleinfo: e }),
						"Middle Info"
					)
				}
			</div>

			<div className="center">
				{" "}
				<button className="addButton btnoutline" onClick={Savedata}>
					Save
				</button>
				<button onClick={Submitdata} className="addButton">
					Submit & Update
				</button>
			</div>

			<div className="mb-10"></div>
			<ToastContainer />
		</div>
	);
}

export default ExtraPagecontentupdate;
