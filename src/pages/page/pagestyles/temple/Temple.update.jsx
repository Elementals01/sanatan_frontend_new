import axios from "axios";
import React, {
	Component,
	useCallback,
	useEffect,
	useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import TitleComponent from "../../../../components/content-form-components/Title";
import { ToastContainer, toast } from "react-toastify";
import Otherscomponent from "./components/Others.component";
import Socialcomponent from "./components/Social.component";
import Timingcomponent from "./components/Timings.component";
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMap,
} from "react-leaflet";
import TextEditor from "../../../../components/form-components/EditorComponent";
import FileInputComponent from "../../../file-manager/components/FileInputComponent";

function Templecontentupdate() {
	const navigate = useNavigate();
	const { id, lang } = useParams();
	const LanguageAdminName = lang;
	const [loading, setLoading] = useState(false);
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
	async function fetchdata() {
		setLoading(true);
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_SERVER}page/temple/${id}`
			);

			setPage(response.data);

			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchdata();
	}, []);
	const PageModal = {
		Availablity: [],
		Media: ["pdf", "text", "video", "audio"],
		title: "",
		description: "",
		innertitle: "",
		innerdescription: "",
		middledescription: "",
		middletitle: "",
		middleinfo: "",
		audiodescription: "",
		videodescription: "",
		documentsdescription: "",
		Road: "",
		Train: "",
		Air: "",
		RoadLabel: "",
		TrainLabel: "",
		AirLabel: "",
		traveldescription: "<p></p>",
		street: "",
		postcode: "",
		city: "",
		state: "",
		country: "",
		lat: "",
		long: "",
		social: [
			{
				image: "",
				label: "",
				link: "",
			},
		],
		others: [
			{
				image: "",
				label: "",
				label2: "",
			},
		],
		timings: [
			{
				image: "",
				label: "",
				from: "",
				to: "",
			},
		],
		otherdescription: "",
		timingdescription: "",
		socialdescription: "",
		audio: [],
		video: [],
		documents: [],
	};
	const setother = (data) => {
		setPage({ ...Page, others: data });
	};
	const setsocial = (data) => {
		setPage({ ...Page, social: data });
	};
	const settiming = (data) => {
		setPage({ ...Page, timings: data });
	};

	const inputHandler = (e) => {
		const { name, value } = e.target;
		setPage({ ...Page, [name]: value });
		console.log(Page);
	};
	const [Page, setPage] = useState(PageModal);
	const [AddAvailable, Availblearray] = useState([{}]);
	const AddAvailablity = (id, value) => {
		Availblearray({ ...AddAvailable, [id]: value });
		setPage({ ...Page, Availablity: AddAvailable });
		console.log(Page);
	};

	const handleEditorChange = useCallback((content, editorName) => {
		setPage((prevState) => ({
			...prevState,
			[editorName]: content,
		}));
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
			const Api = `${process.env.REACT_APP_SERVER}page/temple/${id}`;
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
			const Api = `${process.env.REACT_APP_SERVER}page/temple/${id}`;
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

	const handleFileDelete = (arrayName, index) => {
		setPage((prevPage) => {
			const updatedArray = [
				...prevPage[arrayName].filter((e) => e !== index),
			];

			return {
				...prevPage,
				[arrayName]: updatedArray,
			};
		});
	};
	return (
		<>
			{loading && (
				<div>
					<span className="loader"></span>
				</div>
			)}
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
									Page.Media.indexOf("pdf") !== -1
										? "white"
										: "black",
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
								onChange={(e) =>
									AddAvailablity("Pdf", e.target.value)
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
									Page.Media.indexOf("text") !== -1
										? "orange"
										: "transparent",
								color:
									Page.Media.indexOf("text") !== -1
										? "white"
										: "black",
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
							(content) => handleEditorChange(content, "title"),
							"Add Title"
						)
					}
					{
						new TextEditor(
							Page.description,
							(content) => handleEditorChange(content, "description"),
							"Add Description"
						)
					}
				</div>
				<div className="Card">
					<h1>Inner Page Details</h1>
					{TitleComponent(Page.innertitle, (e) =>
						setPage({ ...Page, innertitle: e })
					)}
					{
						new TextEditor(
							Page.innerdescription,
							(content) =>
								handleEditorChange(content, "innerdescription"),
							"Add Inner description"
						)
					}
				</div>
				<div className="Card">
					<h1>Other Details</h1>
					{
						new TextEditor(Page.otherdescription, (e) =>
							setPage({ ...Page, otherdescription: e })
						)
					}
				</div>
				{/* Timmings */}
				<div className="Card">
					<h1>Timings</h1>

					{Timingcomponent((data) => settiming(data), Page.timings)}
				</div>
				{/* Social Media */}
				<div className="Card">
					<h1>Social Media</h1>

					{Socialcomponent((data) => setsocial(data), Page.social)}
				</div>
				{/* Location */}
				<div className="Card">
					<h1>Location</h1>

					<div className="drop-col">
						<span>Street no.</span>
						<input
							type="text"
							name="street"
							value={Page.street}
							onChange={inputHandler}
						/>
					</div>
					<div className="drop-group">
						<div className="drop-col">
							<span>Post Code</span>
							<input
								type="text"
								name="postcode"
								value={Page.postcode}
								onChange={inputHandler}
							/>
						</div>
						<div className="drop-col">
							<span>City</span>
							<input
								type="text"
								name="city"
								value={Page.city}
								onChange={inputHandler}
							/>
						</div>
						<div className="drop-col">
							<span>State</span>
							<input
								type="text"
								name="state"
								value={Page.state}
								onChange={inputHandler}
							/>
						</div>
						<div className="drop-col">
							<span>Country</span>
							<input
								type="text"
								name="country"
								value={Page.country}
								onChange={inputHandler}
							/>
						</div>
						<div className="drop-col">
							<span>Latitude (For Maps Pin Position)</span>
							<input
								type="number"
								name="lat"
								value={Page.lat && Page.lat}
								onChange={inputHandler}
							/>
						</div>
						<div className="drop-col">
							<span>Longitude (For Maps Pin Position)</span>
							<input
								type="number"
								name="long"
								value={Page.long && Page.long}
								onChange={inputHandler}
							/>
						</div>
					</div>
				</div>
				<MapContainer
					center={[20.5937, 78.9629]}
					zoom={5}
					scrollWheelZoom={true}>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					{(Page.lat || Page.long) && (
						<Marker position={[Page.lat, Page.long]}>
							<Popup>
								A pretty CSS3 popup. <br /> Easily customizable.
							</Popup>
						</Marker>
					)}
				</MapContainer>
				,{/* Travel Distance */}
				<div className="Card">
					<h1>Travel Distance</h1>
					{
						new TextEditor(
							Page.traveldescription,
							(e) => setPage({ ...Page, traveldescription: e }),
							"Description"
						)
					}
					<div className="drop-group">
						<div className="drop-col">
							<span>Airplane</span>
							<input
								type="text"
								name="Air"
								value={Page.Air}
								onChange={inputHandler}
							/>
						</div>
						<div className="drop-col">
							<span>Add Label</span>
							<input
								type="text"
								name="AirLabel"
								value={Page.AirLabel}
								onChange={inputHandler}
							/>
						</div>
						<div className="drop-col">
							<span>Train</span>
							<input
								type="text"
								name="Train"
								value={Page.Train}
								onChange={inputHandler}
							/>
						</div>
						<div className="drop-col">
							<span>Add Label</span>
							<input
								type="text"
								name="TrainLabel"
								value={Page.TrainLabel}
								onChange={inputHandler}
							/>
						</div>
						<div className="drop-col">
							<span>Road</span>
							<input
								type="text"
								name="Road"
								value={Page.Road}
								onChange={inputHandler}
							/>
						</div>
						<div className="drop-col">
							<span>Add Label</span>
							<input
								type="text"
								name="RoadLabel"
								value={Page.RoadLabel}
								onChange={inputHandler}
							/>
						</div>
					</div>
				</div>
				<div className="Card tablecard">
					<h1>Audio</h1>
					{
						new TextEditor(
							Page.audiodescription,
							(e) => setPage({ ...Page, audiodescription: e }),
							""
						)
					}
					<FileInputComponent
						title="Upload File or add link"
						links={Page.audio}
						onDelete={(i) => handleFileDelete("audio", i)}
						onAdd={(file) => Page.audio.push(file)}
						type={"array"}
					/>
				</div>
				<div className="Card tablecard">
					<h1>Video</h1>
					{
						new TextEditor(
							Page.videodescription,
							(e) => setPage({ ...Page, videodescription: e }),
							""
						)
					}
					<FileInputComponent
						title="Upload File or add link"
						links={Page.video}
						onDelete={(i) => handleFileDelete("video", i)}
						onAdd={(file) => Page.video.push(file)}
						type={"array"}
					/>
				</div>
				<div className="Card tablecard">
					<h1>Documents</h1>
					{
						new TextEditor(
							Page.documentsdescription,
							(e) => setPage({ ...Page, documentsdescription: e }),
							""
						)
					}
					<FileInputComponent
						title="Upload File or add link"
						links={Page.documents}
						onDelete={(i) => handleFileDelete("documents", i)}
						onAdd={(file) => Page.documents.push(file)}
						type={"array"}
					/>
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
		</>
	);
}

export default Templecontentupdate;
