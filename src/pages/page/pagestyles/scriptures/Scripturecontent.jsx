import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import SubTitleComponent from "../../../../components/content-form-components/subtitle";
import ChapterComponent from "../../../../components/content-form-components/Chapter";
import FileInputComponent from "../../../file-manager/components/FileInputComponent";
import TitleComponent from "../../../../components/form-components/Title";
import TextEditor from "../../../../components/form-components/EditorComponent";
import ReactHtmlParser from "react-html-parser";
import IncludeInfocomponent from "./component/InnerInfo-Section";
function Scripturecontent() {
	const navigate = useNavigate();
	const { id, lang } = useParams();
	const LanguageAdminName = lang;
	const Model = {
		Availablity: [],
		Media: ["pdf", "text", "video", "audio"],
		pdf: [],
		title: "",
		description: "",
		innertitle: "",
		innerdescription: "",
		includeDescription: "",
		include: [{ image: "", label: "" }],
		Chapters: [],
		Page: id,
		Language: lang,
	};
	const [Page, setPage] = useState(Model);
	const [AddAvailable, Availblearray] = useState([{}]);
	const [cardtoggle, settoggle] = useState(null);
	const minitoggle = (i) => {
		if (i == cardtoggle) {
			settoggle(null);
		} else {
			settoggle(i);
		}
		console.log(cardtoggle);
	};
	const AddAvailablity = (id, value) => {
		Availblearray({ ...AddAvailable, [id]: value });
		setPage((prevPage) => ({
			...prevPage,
			Availablity: AddAvailable,
		}));
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

	const [Chapters, setChapters] = useState([
		{
			title: "<p></p>",
			subtitle: "<p></p>",
			chapter: "<p></p>",
			chapterlanguage: "<p></p>",
			chaptercommentry: "<p></p>",
			chaptercommentrylanguage: "<p></p>",
			video: "",
			audio: "",
			pdf: "",
		},
	]);
	const AddChapterCard = () => {
		setChapters([
			...Chapters,
			{
				title: "<p></p>",
				subtitle: "<p></p>",
				chapter: "<p></p>",
				chapterlanguage: "<p></p>",
				chaptercommentry: "<p></p>",
				chaptercommentrylanguage: "<p></p>",
				video: "",
				audio: "",
				pdf: "",
			},
		]);
	};
	const deleteChapter = (index) => {
		const list = [...Chapters];
		list.splice(index, 1);
		setChapters(list);
	};
	const handleinputs = (name, e, index) => {
		const updatefield = Chapters.map((chapter, i) =>
			index == i ? Object.assign(chapter, { [name]: e }) : chapter
		);
		setChapters(updatefield);
		setPage({ ...Page, Chapters: Chapters });
	};

	const Savedata = async (e) => {
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
			try {
				setPage({ ...Page, Chapters: Chapters });
				const Api = `${process.env.REACT_APP_SERVER}page/scripture/`;
				const res = await axios.post(Api, Page);

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

				navigate(`/pages/edit/scripture/${res.data._id}/${lang}`);
			} catch (error) {
				errormsg();
			}
		}
	};

	const Submitdata = async (e) => {
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
			try {
				setPage({ ...Page, Chapters: Chapters });
				const Api = `${process.env.REACT_APP_SERVER}page/scripture/`;
				await axios.post(Api, Page);
				const notify = () =>
					toast.success("Successfully Added", {
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

				navigate(`/pages`);
			} catch (error) {
				errormsg();
			}
		}
	};
	const handleDelete = (arrayName, index) => {
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
	const setInclude = (data) => {
		setPage({ ...Page, include: data });
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
				<h1>Inner Page Include Info</h1>
				{
					new TextEditor(
						Page.includeDescription,
						(e) => setPage({ ...Page, includeDescription: e }),
						"Include Description"
					)
				}

				{IncludeInfocomponent(
					(value) => setInclude(value),
					Page.include
				)}
			</div>
			<h1>Pdf</h1>
			<div className="Card">
				<FileInputComponent
					title="Upload pdf or add link"
					links={Page.pdf}
					onDelete={(i) => handleDelete("pdf", i)}
					onAdd={(image) => Page.pdf.push(image)}
					type={"array"}
				/>
			</div>
			<h1>Text / Audio / Video</h1>
			{Chapters.map((Chapter, i) => {
				return (
					<div className="Card" key={i}>
						<div
							className={
								cardtoggle == i ? "card-head" : "card-head closed"
							}>
							{" "}
							<div className="minimize">
								<button
									onClick={() => minitoggle(i)}
									className="minimize-btn">
									v
								</button>
								<button className="move-btn"></button>
							</div>
							{cardtoggle === i ? (
								TitleComponent(Chapter?.title, (e) =>
									handleinputs("title", e, i)
								)
							) : (
								<div className="drop-col">
									{" "}
									<h3 className="drop-lable">
										{ReactHtmlParser(Chapter?.title)}
									</h3>
								</div>
							)}
						</div>
						<div
							className={
								cardtoggle == i ? "cardcontent" : "cardcontent hidden"
							}>
							{
								new SubTitleComponent(Chapter?.subtitle, (e) =>
									handleinputs("subtitle", e, i)
								)
							}
							{
								new ChapterComponent(
									"Chapter",
									Chapter?.chapter,
									(e) => handleinputs("chapter", e, i)
								)
							}
							{
								new ChapterComponent(
									`Chapter (${LanguageAdminName})`,
									Chapter?.chapterlang,
									(e) => handleinputs("chapterlang", e, i)
								)
							}
							{
								new ChapterComponent(
									`Chapter (Commentry)`,
									Chapter?.commentery,
									(e) => handleinputs("commentery", e, i)
								)
							}
							{
								new ChapterComponent(
									`Chapter Commentry (${LanguageAdminName})`,
									Chapter?.commenterylang,
									(e) => handleinputs("commenterylang", e, i)
								)
							}
							<FileInputComponent
								title="Upload Audio or add link"
								links={Chapter.audio}
								onDelete={() => handleinputs("audio", "", i)}
								onAdd={(file) => handleinputs("audio", file, i)}
								type={"single"}
							/>
							<FileInputComponent
								title="Upload Video or add link"
								links={Chapter.video}
								onDelete={() => handleinputs("video", "", i)}
								onAdd={(file) => handleinputs("video", file, i)}
								type={"single"}
							/>
							<FileInputComponent
								title="Upload Pdf or add link"
								links={Chapter.pdf}
								onDelete={() => handleinputs("pdf", "", i)}
								onAdd={(file) => handleinputs("pdf", file, i)}
								type={"single"}
							/>
							<div className="center mb-4">
								{" "}
								<button
									className="addButton btnoutline"
									onClick={() => deleteChapter(i)}>
									Delete
								</button>
								<button onClick={Savedata} className="addButton">
									Save
								</button>
							</div>{" "}
						</div>
					</div>
				);
			})}
			<div className="center">
				{" "}
				<button
					onClick={AddChapterCard}
					className="addButton btnoutline">
					Add more
				</button>
				<button className="addButton btnoutline" onClick={Savedata}>
					Save
				</button>
				<button onClick={Submitdata} className="addButton">
					Submit
				</button>
			</div>
			<div className="mb-10"></div>
			<ToastContainer />{" "}
		</div>
	);
}

export default Scripturecontent;
